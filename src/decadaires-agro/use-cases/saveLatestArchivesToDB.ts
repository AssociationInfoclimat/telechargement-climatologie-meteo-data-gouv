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
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { saveLatestFrequenceArchivesToDB } from '@/use-cases/saveLatestFrequenceArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveLatestDecadairesAgroArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    dateGrepper,
    lineReader,
    decadairesAgroRepository,
    saveHistoryRepository,
    currentDate,
    departements,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    dateGrepper: DateGrepper;
    lineReader: LineReader;
    decadairesAgroRepository: DecadairesAgroRepository;
    saveHistoryRepository: SaveHistoryRepository;
    currentDate: Date;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveLatestFrequenceArchivesToDB<DecadaireAgroLine, DecadaireAgroDTO>({
        frequence: FREQUENCES.decadaireAgro,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        dateGrepper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireAgroCSV,
        toDTO,
        frequencesRepository: decadairesAgroRepository,
        saveHistoryRepository,
        currentDate,
        departements,
        queue,
        deleteCSV,
    });
}
