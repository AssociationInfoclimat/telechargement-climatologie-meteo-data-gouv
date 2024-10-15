import { DecadaireLine, parseDecadaireCSV } from '@/csv/decadaires/parseCSV.js';
import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { toDTO } from '@/db/decadaires/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesCSVToDB({
    csv,
    readLines,
    decadairesRepository,
    saveProgressRepository,
    queue,
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    decadairesRepository: DecadairesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<DecadaireLine, DecadaireDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}-${line.NUM_DECADE}`,
        parseCSV: parseDecadaireCSV,
        toDTO,
        frequencesRepository: decadairesRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
