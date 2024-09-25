import { parseCSV } from '@/csv/horaires/parseCSV.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { toDTO } from '@/db/horaires/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function saveCSVToDB({
    csv,
    readLines,
    repository,
}: {
    csv: string;
    readLines: LineReader;
    repository: HorairesRepository;
}): Promise<void> {
    const csvLines = readLines(csv);
    const infrahorairesLines = parseCSV(csvLines);
    for await (const line of infrahorairesLines) {
        LoggerSingleton.getSingleton().info({
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHH}`,
        });
        await repository.upsert(toDTO(line));
    }
}
