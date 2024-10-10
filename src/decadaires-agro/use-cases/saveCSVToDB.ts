import { DecadaireAgroLine, parseCSV } from '@/csv/decadaires-agro/parseCSV.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { toDTO } from '@/db/decadaires-agro/toDTO.js';
import { Buffer } from '@/lib/Buffer.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import PQueue from 'p-queue';

export async function saveCSVToDB({
    csv,
    readLines,
    decadairesAgroRepository,
    saveProgressRepository,
    queue,
}: {
    csv: string;
    readLines: LineReader;
    decadairesAgroRepository: DecadairesAgroRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
}): Promise<void> {
    queue = queue ?? new PQueue({ concurrency: 50 });
    const csvLines = readLines(csv);
    const results = parseCSV(csvLines);

    const buffer = new Buffer<DecadaireAgroLine>({
        onChunk: lines => queue.add(() => decadairesAgroRepository.upsertMany(lines.map(toDTO))),
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
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}-${line.NUM_DECADE}`,
        });
        buffer.add(line);
    }
    buffer.flush();

    await queue.onIdle();
    await saveProgressRepository.markAsSaved(getCSVName(csv));
}
