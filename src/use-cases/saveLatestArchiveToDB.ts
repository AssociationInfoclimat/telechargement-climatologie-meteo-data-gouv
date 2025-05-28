import { unzipArchive } from '@/archives/use-cases/unzip/unzipArchive.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { FrequenceRepository } from '@/db/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveLatestArchiveToDB<L, D>({
    gzpath,
    fileExistenceChecker,
    unzipper,
    startDate,
    currentDate,
    dateGrepper,
    lineReader,
    lineReadingDebugMessageCreator,
    parseCSV,
    toDTO,
    frequencesRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    startDate: Date | null;
    currentDate: Date;
    dateGrepper: DateGrepper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: L) => string;
    parseCSV: CSVParser<L>;
    toDTO: DTOAdapter<L, D>;
    frequencesRepository: FrequenceRepository<D>;
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
    const greppedCsv = startDate ? csv.replace(/\.csv$/, '.grepped.csv') : csv;
    if (startDate) {
        await dateGrepper({
            sourceFile: csv,
            targetFile: greppedCsv,
            startDate: startDate,
            endDate: currentDate,
        });
    }
    await saveCSVToDB({
        csv: greppedCsv,
        readLines: lineReader,
        lineReadingDebugMessageCreator,
        parseCSV,
        toDTO,
        frequencesRepository,
        queue,
        deleteCSV,
    });
}
