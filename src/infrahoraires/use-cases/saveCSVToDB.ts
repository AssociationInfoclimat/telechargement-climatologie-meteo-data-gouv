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
    const results = parseCSV(csvLines);
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
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHHMN.toISOString()}`,
        });
        await repository.upsert(toDTO(line));
    }
}
