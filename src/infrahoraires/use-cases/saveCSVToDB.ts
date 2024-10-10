import { parseInfrahoraireCSV } from '@/csv/infrahoraires/parseCSV.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { toDTO } from '@/db/infrahoraires/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveInfrahorairesCSVToDB({
    csv,
    readLines,
    infrahorairesRepository,
    saveProgressRepository,
    queue,
}: {
    csv: string;
    readLines: LineReader;
    infrahorairesRepository: InfrahorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
}): Promise<void> {
    await saveCSVToDB({
        csv,
        readLines,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHHMN.toISOString()}`,
        parseCSV: parseInfrahoraireCSV,
        toDTO,
        frequencesRepository: infrahorairesRepository,
        saveProgressRepository,
        queue,
    });
}
