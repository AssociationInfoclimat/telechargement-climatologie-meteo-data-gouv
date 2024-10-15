import { Departement } from '@/archives/departements/Departement.js';
import { DecadaireLine, parseDecadaireCSV } from '@/csv/decadaires/parseCSV.js';
import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { toDTO } from '@/db/decadaires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesCSVsToDB({
    directory,
    globber,
    lineReader,
    decadairesRepository,
    saveProgressRepository,
    departement,
    overwrite,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    decadairesRepository: DecadairesRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVsToDB<DecadaireLine, DecadaireDTO>({
        frequence: FREQUENCES.decadaire,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}-${line.NUM_DECADE}`,
        parseCSV: parseDecadaireCSV,
        toDTO,
        frequencesRepository: decadairesRepository,
        saveProgressRepository,
        departement,
        overwrite,
        queue,
        deleteCSV,
    });
}
