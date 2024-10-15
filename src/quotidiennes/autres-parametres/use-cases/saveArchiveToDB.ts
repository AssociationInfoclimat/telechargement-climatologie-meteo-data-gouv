import { CSVParser } from '@/csv/parseCSV.js';
import {
    createReadingLineDebugMessage,
    parseQuotidienneAutresParametresCSV,
    QuotidienneAutresParametresLine,
} from '@/csv/quotidiennes/autres-parametres/parseCSV.js';
import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesAutresParametresArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    quotidiennesAutresParametresRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: QuotidienneAutresParametresLine) => string;
    parseCSV: CSVParser<QuotidienneAutresParametresLine>;
    toDTO: DTOAdapter<QuotidienneAutresParametresLine, QuotidienneAutresParametresDTO>;
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<QuotidienneAutresParametresLine, QuotidienneAutresParametresDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneAutresParametresCSV,
        toDTO,
        frequencesRepository: quotidiennesAutresParametresRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
