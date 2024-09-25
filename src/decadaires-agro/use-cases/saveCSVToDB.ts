import { parseCSV } from '@/csv/decadaires-agro/parseCSV.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { toDTO } from '@/db/decadaires-agro/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function saveCSVToDB({
    csv,
    readLines,
    repository,
}: {
    csv: string;
    readLines: LineReader;
    repository: DecadairesAgroRepository;
}): Promise<void> {
    const csvLines = readLines(csv);
    const infrahorairesLines = parseCSV(csvLines);
    for await (const line of infrahorairesLines) {
        LoggerSingleton.getSingleton().info({
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM}-${line.NUM_DECADE}`,
        });
        await repository.upsert(toDTO(line));
    }
}
