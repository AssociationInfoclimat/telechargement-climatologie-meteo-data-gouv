import { CSVParser } from '@/csv/parseCSV.js';
import {
    createReadingLineDebugMessage,
    parseQuotidienneCSV,
    QuotidienneLine,
} from '@/csv/quotidiennes/rr-t-vent/parseCSV.js';
import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    quotidiennesRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: QuotidienneLine) => string;
    parseCSV: CSVParser<QuotidienneLine>;
    toDTO: DTOAdapter<QuotidienneLine, QuotidienneDTO>;
    quotidiennesRepository: QuotidiennesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<QuotidienneLine, QuotidienneDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneCSV,
        toDTO,
        frequencesRepository: quotidiennesRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
