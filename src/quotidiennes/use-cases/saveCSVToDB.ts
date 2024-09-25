import { parseCSV } from '@/csv/quotidiennes/parseCSV.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/Repository.js';
import { toDTO } from '@/db/quotidiennes/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function saveCSVToDB({
    csv,
    readLines,
    repository,
}: {
    csv: string;
    readLines: LineReader;
    repository: QuotidiennesRepository;
}): Promise<void> {
    const csvLines = readLines(csv);
    const infrahorairesLines = parseCSV(csvLines);
    for await (const line of infrahorairesLines) {
        LoggerSingleton.getSingleton().info({
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJ}`,
        });
        await repository.upsert(toDTO(line));
    }
}
