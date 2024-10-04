import { getCSVName } from '@/csv/getCSVName.js';
import { parseCSV, QuotidienneAutresParametresLine } from '@/csv/quotidiennes/autres-parametres/parseCSV.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { toDTO } from '@/db/quotidiennes/autres-parametres/toDTO.js';
import { Buffer } from '@/lib/Buffer.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';

export async function saveCSVToDB({
    csv,
    readLines,
    quotidiennesAutresParametresRepository,
    saveProgressRepository,
}: {
    csv: string;
    readLines: LineReader;
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveProgressRepository: SaveProgressRepository;
}): Promise<void> {
    const csvLines = readLines(csv);
    const results = parseCSV(csvLines);

    const upserts$: Promise<void>[] = [];
    const buffer = new Buffer<QuotidienneAutresParametresLine>({
        onChunk: lines => upserts$.push(quotidiennesAutresParametresRepository.upsertMany(lines.map(toDTO))),
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
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJ.toISOString()}`,
        });
        buffer.add(line);
    }
    buffer.flush();

    await Promise.all(upserts$);
    await saveProgressRepository.markAsSaved(getCSVName(csv));
}
