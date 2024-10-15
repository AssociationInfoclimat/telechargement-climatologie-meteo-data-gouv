import { unzipArchive } from '@/archives/use-cases/unzip/unzipArchive.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { FrequenceRepository } from '@/db/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveArchiveToDB<L, D>({
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
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: L) => string;
    parseCSV: CSVParser<L>;
    toDTO: DTOAdapter<L, D>;
    frequencesRepository: FrequenceRepository<D>;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await unzipArchive({
        gzpath,
        fileExists: fileExistenceChecker,
        gunzip: unzipper,
        overwrite,
    });
    const csv = gzpath.replace(/\.gz$/, '');
    LoggerSingleton.getSingleton().info({ message: `Reading file : '${csv}'` });
    await saveCSVToDB({
        csv,
        readLines: lineReader,
        lineReadingDebugMessageCreator,
        parseCSV,
        toDTO,
        frequencesRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
