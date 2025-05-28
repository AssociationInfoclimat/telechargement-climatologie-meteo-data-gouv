import { Departement } from '@/archives/departements/Departement.js';
import { createReadingLineDebugMessage, MensuelleLine, parseMensuelleCSV } from '@/csv/mensuelles/parseCSV.js';
import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';
import { toDTO } from '@/db/mensuelles/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { saveLatestFrequenceArchivesToDB } from '@/use-cases/saveLatestFrequenceArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveLatestMensuellesArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    dateGrepper,
    lineReader,
    mensuellesRepository,
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
    mensuellesRepository: MensuellesRepository;
    saveHistoryRepository: SaveHistoryRepository;
    currentDate: Date;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveLatestFrequenceArchivesToDB<MensuelleLine, MensuelleDTO>({
        frequence: FREQUENCES.mensuelle,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        dateGrepper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseMensuelleCSV,
        toDTO,
        frequencesRepository: mensuellesRepository,
        saveHistoryRepository,
        currentDate,
        departements,
        queue,
        deleteCSV,
    });
}
