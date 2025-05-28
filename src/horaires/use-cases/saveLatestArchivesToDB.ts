import { Departement } from '@/archives/departements/Departement.js';
import { createReadingLineDebugMessage, HoraireLine, parseHoraireCSV } from '@/csv/horaires/parseCSV.js';
import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { toDTO } from '@/db/horaires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { saveLatestFrequenceArchivesToDB } from '@/use-cases/saveLatestFrequenceArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveLatestHorairesArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    dateGrepper,
    lineReader,
    horairesRepository,
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
    horairesRepository: HorairesRepository;
    saveHistoryRepository: SaveHistoryRepository;
    currentDate: Date;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveLatestFrequenceArchivesToDB<HoraireLine, HoraireDTO>({
        frequence: FREQUENCES.horaire,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        dateGrepper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseHoraireCSV,
        toDTO,
        frequencesRepository: horairesRepository,
        saveHistoryRepository,
        currentDate,
        departements,
        queue,
        deleteCSV,
    });
}
