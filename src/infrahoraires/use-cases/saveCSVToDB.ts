import { parseCSV } from '@/csv/infrahoraires/parseCSV.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { toDTO } from '@/db/infrahoraires/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function saveCSVToDB({
    csv,
    readLines,
    repository,
}: {
    csv: string;
    readLines: LineReader;
    repository: InfrahorairesRepository;
}): Promise<void> {
    const csvLines = readLines(csv);
    const infrahorairesLines = parseCSV(csvLines);
    for await (const line of infrahorairesLines) {
        LoggerSingleton.getSingleton().info({
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHHMN}`,
        });
        await repository.upsert(toDTO(line));
    }
}
