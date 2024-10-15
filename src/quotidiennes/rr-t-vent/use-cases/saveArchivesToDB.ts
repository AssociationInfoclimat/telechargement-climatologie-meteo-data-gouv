import { Departement } from '@/archives/departements/Departement.js';
import {
    createReadingLineDebugMessage,
    parseQuotidienneCSV,
    QuotidienneLine,
} from '@/csv/quotidiennes/rr-t-vent/parseCSV.js';
import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';
import { toDTO } from '@/db/quotidiennes/rr-t-vent/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchivesToDB } from '@/use-cases/saveArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    lineReader,
    quotidiennesRepository,
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
    quotidiennesRepository: QuotidiennesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    departement?: Departement;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchivesToDB<QuotidienneLine, QuotidienneDTO>({
        frequence: FREQUENCES.quotidienne,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneCSV,
        toDTO,
        frequencesRepository: quotidiennesRepository,
        saveProgressRepository,
        overwrite,
        departement,
        queue,
        deleteCSV,
    });
}
