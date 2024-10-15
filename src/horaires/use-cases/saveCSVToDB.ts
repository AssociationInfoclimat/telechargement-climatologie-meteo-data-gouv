import { createReadingLineDebugMessage, HoraireLine, parseHoraireCSV } from '@/csv/horaires/parseCSV.js';
import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { toDTO } from '@/db/horaires/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveHorairesCSVToDB({
    csv,
    readLines,
    horairesRepository,
    saveProgressRepository,
    queue,
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    horairesRepository: HorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<HoraireLine, HoraireDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseHoraireCSV,
        toDTO,
        frequencesRepository: horairesRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
