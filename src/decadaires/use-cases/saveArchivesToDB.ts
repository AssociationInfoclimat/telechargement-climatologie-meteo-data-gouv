import { Departement } from '@/archives/departements/Departement.js';
import { createReadingLineDebugMessage, DecadaireLine, parseDecadaireCSV } from '@/csv/decadaires/parseCSV.js';
import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { toDTO } from '@/db/decadaires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchivesToDB } from '@/use-cases/saveArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    lineReader,
    decadairesRepository,
    saveProgressRepository,
    overwrite,
    departements,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    decadairesRepository: DecadairesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchivesToDB<DecadaireLine, DecadaireDTO>({
        frequence: FREQUENCES.decadaire,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireCSV,
        toDTO,
        frequencesRepository: decadairesRepository,
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });
}
