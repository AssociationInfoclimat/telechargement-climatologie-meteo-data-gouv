import {
    createReadingLineDebugMessage,
    parseQuotidienneCSV,
    QuotidienneLine,
} from '@/csv/quotidiennes/rr-t-vent/parseCSV.js';
import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';
import { toDTO } from '@/db/quotidiennes/rr-t-vent/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesCSVToDB({
    csv,
    readLines,
    quotidiennesRepository,
    saveProgressRepository,
    queue,
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    quotidiennesRepository: QuotidiennesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<QuotidienneLine, QuotidienneDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneCSV,
        toDTO,
        frequencesRepository: quotidiennesRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
