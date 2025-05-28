import { Departement } from '@/archives/departements/Departement.js';
import { createReadingLineDebugMessage, DecadaireLine, parseDecadaireCSV } from '@/csv/decadaires/parseCSV.js';
import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { toDTO } from '@/db/decadaires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { saveLatestFrequenceArchivesToDB } from '@/use-cases/saveLatestFrequenceArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveLatestDecadairesArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    dateGrepper,
    lineReader,
    decadairesRepository,
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
    decadairesRepository: DecadairesRepository;
    saveHistoryRepository: SaveHistoryRepository;
    currentDate: Date;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveLatestFrequenceArchivesToDB<DecadaireLine, DecadaireDTO>({
        frequence: FREQUENCES.decadaire,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        dateGrepper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireCSV,
        toDTO,
        frequencesRepository: decadairesRepository,
        saveHistoryRepository,
        currentDate,
        departements,
        queue,
        deleteCSV,
    });
}
