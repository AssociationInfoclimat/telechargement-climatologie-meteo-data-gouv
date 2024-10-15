import { createReadingLineDebugMessage, DecadaireLine, parseDecadaireCSV } from '@/csv/decadaires/parseCSV.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    decadairesRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: DecadaireLine) => string;
    parseCSV: CSVParser<DecadaireLine>;
    toDTO: DTOAdapter<DecadaireLine, DecadaireDTO>;
    decadairesRepository: DecadairesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<DecadaireLine, DecadaireDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireCSV,
        toDTO,
        frequencesRepository: decadairesRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
