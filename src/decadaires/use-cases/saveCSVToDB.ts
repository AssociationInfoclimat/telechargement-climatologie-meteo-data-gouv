import { parseCSV } from '@/csv/decadaires/parseCSV.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { toDTO } from '@/db/decadaires/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';

export async function saveCSVToDB({
    csv,
    readLines,
    decadairesRepository,
    saveProgressRepository,
}: {
    csv: string;
    readLines: LineReader;
    decadairesRepository: DecadairesRepository;
    saveProgressRepository: SaveProgressRepository;
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
            message: `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}-${line.NUM_DECADE}`,
        });
        await decadairesRepository.upsert(toDTO(line));
        await saveProgressRepository.markAsSaved(getCSVName(csv));
    }
}
