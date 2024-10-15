import { Departement } from '@/archives/departements/Departement.js';
import {
    createReadingLineDebugMessage,
    parseQuotidienneAutresParametresCSV,
    QuotidienneAutresParametresLine,
} from '@/csv/quotidiennes/autres-parametres/parseCSV.js';
import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { toDTO } from '@/db/quotidiennes/autres-parametres/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesAutresParametresCSVsToDB({
    directory,
    globber,
    lineReader,
    quotidiennesAutresParametresRepository,
    saveProgressRepository,
    departement,
    overwrite,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVsToDB<QuotidienneAutresParametresLine, QuotidienneAutresParametresDTO>({
        frequence: FREQUENCES.quotidienneAutresParametres,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseQuotidienneAutresParametresCSV,
        toDTO,
        frequencesRepository: quotidiennesAutresParametresRepository,
        saveProgressRepository,
        departement,
        overwrite,
        queue,
        deleteCSV,
    });
}
