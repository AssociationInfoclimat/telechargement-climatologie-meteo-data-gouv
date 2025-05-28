import { Departement } from '@/archives/departements/Departement.js';
import {
    createReadingLineDebugMessage,
    parseQuotidienneAutresParametresCSV,
    QuotidienneAutresParametresLine,
} from '@/csv/quotidiennes/autres-parametres/parseCSV.js';
import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { toDTO } from '@/db/quotidiennes/autres-parametres/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { saveLatestFrequenceArchivesToDB } from '@/use-cases/saveLatestFrequenceArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveLatestQuotidiennesAutresParametresArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    dateGrepper,
    lineReader,
    quotidiennesAutresParametresRepository,
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
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveHistoryRepository: SaveHistoryRepository;
    currentDate: Date;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveLatestFrequenceArchivesToDB<QuotidienneAutresParametresLine, QuotidienneAutresParametresDTO>({
        frequence: FREQUENCES.quotidienneAutresParametres,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        dateGrepper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneAutresParametresCSV,
        toDTO,
        frequencesRepository: quotidiennesAutresParametresRepository,
        saveHistoryRepository,
        currentDate,
        departements,
        queue,
        deleteCSV,
    });
}
