import { Departement } from '@/archives/departements/Departement.js';
import {
    createReadingLineDebugMessage,
    DecadaireAgroLine,
    parseDecadaireAgroCSV,
} from '@/csv/decadaires-agro/parseCSV.js';
import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { toDTO } from '@/db/decadaires-agro/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchivesToDB } from '@/use-cases/saveArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesAgroArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    lineReader,
    decadairesAgroRepository,
    saveProgressRepository,
    overwrite,
    departement,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    decadairesAgroRepository: DecadairesAgroRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    departement?: Departement;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchivesToDB<DecadaireAgroLine, DecadaireAgroDTO>({
        frequence: FREQUENCES.decadaireAgro,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireAgroCSV,
        toDTO,
        frequencesRepository: decadairesAgroRepository,
        saveProgressRepository,
        overwrite,
        departement,
        queue,
        deleteCSV,
    });
}
