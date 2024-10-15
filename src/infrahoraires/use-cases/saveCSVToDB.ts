import { createReadingLineDebugMessage, InfrahoraireLine, parseInfrahoraireCSV } from '@/csv/infrahoraires/parseCSV.js';
import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
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
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    infrahorairesRepository: InfrahorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<InfrahoraireLine, InfrahoraireDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseInfrahoraireCSV,
        toDTO,
        frequencesRepository: infrahorairesRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
