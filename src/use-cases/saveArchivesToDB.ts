import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/archives/files/globFrequence.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { FrequenceRepository } from '@/db/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { Frequence } from '@/files/Frequence.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveArchivesToDB<L, D>({
    frequence,
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    lineReader,
    lineReadingDebugMessageCreator,
    parseCSV,
    toDTO,
    frequencesRepository,
    saveProgressRepository,
    overwrite,
    departement,
    queue,
    deleteCSV,
}: {
    frequence: Frequence;
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: L) => string;
    parseCSV: CSVParser<L>;
    toDTO: DTOAdapter<L, D>;
    frequencesRepository: FrequenceRepository<D>;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    departement?: Departement;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    const archives = await globFrequence({
        frequence,
        directory,
        glob: globber,
        departement,
    });
    const alreadySaved = await saveProgressRepository.getAlreadySaved();
    for (const gzpath of archives) {
        if (alreadySaved.includes(getCSVName(gzpath))) {
            if (!overwrite) {
                LoggerSingleton.getSingleton().info({ message: `Skipping already saved : '${gzpath}'` });
                continue;
            }
            LoggerSingleton.getSingleton().info({ message: `Overwriting already saved : '${gzpath}'` });
        }
        await saveArchiveToDB({
            gzpath,
            fileExistenceChecker,
            unzipper,
            lineReader,
            lineReadingDebugMessageCreator,
            parseCSV,
            toDTO,
            frequencesRepository,
            saveProgressRepository,
            overwrite,
            queue,
            deleteCSV,
        });
    }
}
