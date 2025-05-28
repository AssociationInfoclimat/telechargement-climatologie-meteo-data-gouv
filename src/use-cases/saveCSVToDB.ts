import { getCSVName } from '@/csv/getCSVName.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { FrequenceRepository } from '@/db/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { Buffer } from '@/lib/Buffer.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import PQueue from 'p-queue';

export async function saveCSVToDB<L, D>({
    csv,
    readLines,
    lineReadingDebugMessageCreator,
    parseCSV,
    toDTO,
    frequencesRepository,
    saveProgressRepository,
    queue = new PQueue({ concurrency: 50 }),
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    lineReadingDebugMessageCreator: (line: L) => string;
    parseCSV: CSVParser<L>;
    toDTO: DTOAdapter<L, D>;
    frequencesRepository: FrequenceRepository<D>;
    saveProgressRepository?: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    const csvLines = readLines(csv);
    const results = parseCSV(csvLines);

    const buffer = new Buffer<L>({
        onChunk: lines => queue.add(() => frequencesRepository.upsertMany(lines.map(toDTO))),
    });
    for await (const result of results) {
        if (!result.ok) {
            LoggerSingleton.getSingleton().error({
                message: `An error occured while reading '${csv}'
${result.error.message}`,
                data: {
                    headers: result.error.headers,
                    line: result.error.line,
                    error: result.error.error.message,
                    data: result.error.data,
                },
            });
            continue;
        }
        const line = result.data;
        LoggerSingleton.getSingleton().debug({ message: lineReadingDebugMessageCreator(line) });
        buffer.add(line);
        await queue.onSizeLessThan(10 * queue.concurrency);
    }
    buffer.flush();

    await queue.onIdle();
    if (saveProgressRepository) {
        await saveProgressRepository.markAsSaved(getCSVName(csv));
    }
    if (deleteCSV) {
        LoggerSingleton.getSingleton().info({ message: `Deleting file : '${csv}'` });
        await deleteCSV(csv);
    }
}
