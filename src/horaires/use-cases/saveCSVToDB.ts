import { getCSVName } from '@/csv/getCSVName.js';
import { HoraireLine, parseHoraireCSV } from '@/csv/horaires/parseCSV.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { toDTO } from '@/db/horaires/toDTO.js';
import { Buffer } from '@/lib/Buffer.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import PQueue from 'p-queue';

export async function saveCSVToDB({
    csv,
    readLines,
    horairesRepository,
    saveProgressRepository,
    queue,
}: {
    csv: string;
    readLines: LineReader;
    horairesRepository: HorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
}): Promise<void> {
    queue = queue ?? new PQueue({ concurrency: 50 });
    const csvLines = readLines(csv);
    const results = parseHoraireCSV(csvLines);

    const buffer = new Buffer<HoraireLine>({
        onChunk: lines => queue.add(() => horairesRepository.upsertMany(lines.map(toDTO))),
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
        LoggerSingleton.getSingleton().debug({
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHH.toISOString()}`,
        });
        buffer.add(line);
    }
    buffer.flush();

    await queue.onIdle();
    await saveProgressRepository.markAsSaved(getCSVName(csv));
}
