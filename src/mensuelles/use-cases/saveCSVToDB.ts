import { parseCSV } from '@/csv/mensuelles/parseCSV.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';
import { toDTO } from '@/db/mensuelles/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function saveCSVToDB({
    csv,
    readLines,
    repository,
}: {
    csv: string;
    readLines: LineReader;
    repository: MensuellesRepository;
}): Promise<void> {
    const csvLines = readLines(csv);
    const infrahorairesLines = parseCSV(csvLines);
    for await (const line of infrahorairesLines) {
        LoggerSingleton.getSingleton().info({
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM}`,
        });
        await repository.upsert(toDTO(line));
    }
}
