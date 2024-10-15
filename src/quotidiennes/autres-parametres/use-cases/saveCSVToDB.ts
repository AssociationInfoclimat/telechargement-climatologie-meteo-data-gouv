import {
    createReadingLineDebugMessage,
    parseQuotidienneAutresParametresCSV,
    QuotidienneAutresParametresLine,
} from '@/csv/quotidiennes/autres-parametres/parseCSV.js';
import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { toDTO } from '@/db/quotidiennes/autres-parametres/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesAutresParametresCSVToDB({
    csv,
    readLines,
    quotidiennesAutresParametresRepository,
    saveProgressRepository,
    queue,
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<QuotidienneAutresParametresLine, QuotidienneAutresParametresDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneAutresParametresCSV,
        toDTO,
        frequencesRepository: quotidiennesAutresParametresRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
