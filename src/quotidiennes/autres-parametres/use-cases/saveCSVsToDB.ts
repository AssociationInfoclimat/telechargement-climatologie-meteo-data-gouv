import { Departement } from '@/archives/departements/Departement.js';
import {
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
    queue,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    queue?: PQueue;
}): Promise<void> {
    await saveCSVsToDB<QuotidienneAutresParametresLine, QuotidienneAutresParametresDTO>({
        frequence: FREQUENCES.quotidienneAutresParametres,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJ.toISOString()}`,
        parseCSV: parseQuotidienneAutresParametresCSV,
        toDTO,
        frequencesRepository: quotidiennesAutresParametresRepository,
        saveProgressRepository,
        departement,
        queue,
    });
}
