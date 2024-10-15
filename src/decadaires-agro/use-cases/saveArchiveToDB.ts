import {
    createReadingLineDebugMessage,
    DecadaireAgroLine,
    parseDecadaireAgroCSV,
} from '@/csv/decadaires-agro/parseCSV.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesAgroArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    decadairesAgroRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: DecadaireAgroLine) => string;
    parseCSV: CSVParser<DecadaireAgroLine>;
    toDTO: DTOAdapter<DecadaireAgroLine, DecadaireAgroDTO>;
    decadairesAgroRepository: DecadairesAgroRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<DecadaireAgroLine, DecadaireAgroDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireAgroCSV,
        toDTO,
        frequencesRepository: decadairesAgroRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
