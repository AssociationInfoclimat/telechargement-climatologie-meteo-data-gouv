import {
    createReadingLineDebugMessage,
    DecadaireAgroLine,
    parseDecadaireAgroCSV,
} from '@/csv/decadaires-agro/parseCSV.js';
import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { toDTO } from '@/db/decadaires-agro/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesAgroCSVToDB({
    csv,
    readLines,
    decadairesAgroRepository,
    saveProgressRepository,
    queue,
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    decadairesAgroRepository: DecadairesAgroRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<DecadaireAgroLine, DecadaireAgroDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireAgroCSV,
        toDTO,
        frequencesRepository: decadairesAgroRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
