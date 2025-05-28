import { Departement } from '@/archives/departements/Departement.js';
import { globLatestFrequence } from '@/archives/files/globLatestFrequence.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { FrequenceRepository } from '@/db/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { Frequence } from '@/files/Frequence.js';
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { saveLatestArchiveToDB } from '@/use-cases/saveLatestArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveLatestFrequenceArchivesToDB<L, D>({
    frequence,
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    dateGrepper,
    lineReader,
    lineReadingDebugMessageCreator,
    parseCSV,
    toDTO,
    frequencesRepository,
    saveHistoryRepository,
    currentDate,
    departements,
    queue,
    deleteCSV,
}: {
    frequence: Frequence;
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    dateGrepper: DateGrepper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: L) => string;
    parseCSV: CSVParser<L>;
    toDTO: DTOAdapter<L, D>;
    frequencesRepository: FrequenceRepository<D>;
    saveHistoryRepository: SaveHistoryRepository;
    currentDate: Date;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    const archives = await globLatestFrequence({
        frequence,
        directory,
        glob: globber,
        departements,
    });
    const lastSuccessfulIngestionDate = await saveHistoryRepository.getLastSuccessfulIngestionDate();
    for (const gzpath of archives) {
        await saveLatestArchiveToDB({
            gzpath,
            fileExistenceChecker,
            unzipper,
            startDate: lastSuccessfulIngestionDate,
            currentDate,
            dateGrepper,
            lineReader,
            lineReadingDebugMessageCreator,
            parseCSV,
            toDTO,
            frequencesRepository,
            overwrite: true,
            queue,
            deleteCSV,
        });
    }
    await saveHistoryRepository.updateLastSuccessfulIngestionDate();
}
