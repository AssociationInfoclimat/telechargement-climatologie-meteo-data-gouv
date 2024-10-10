import { Departement } from '@/archives/departements/Departement.js';
import { parseQuotidienneCSV, QuotidienneLine } from '@/csv/quotidiennes/rr-t-vent/parseCSV.js';
import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';
import { toDTO } from '@/db/quotidiennes/rr-t-vent/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveQuotidiennesCSVsToDB({
    directory,
    globber,
    lineReader,
    quotidiennesRepository,
    saveProgressRepository,
    departement,
    queue,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    quotidiennesRepository: QuotidiennesRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    queue?: PQueue;
}): Promise<void> {
    await saveCSVsToDB<QuotidienneLine, QuotidienneDTO>({
        frequence: FREQUENCES.quotidienne,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJ.toISOString()}`,
        parseCSV: parseQuotidienneCSV,
        toDTO,
        frequencesRepository: quotidiennesRepository,
        saveProgressRepository,
        departement,
        queue,
    });
}
