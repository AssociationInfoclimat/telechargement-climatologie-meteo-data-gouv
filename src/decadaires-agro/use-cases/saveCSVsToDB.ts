import { Departement } from '@/archives/departements/Departement.js';
import {
    createReadingLineDebugMessage,
    DecadaireAgroLine,
    parseDecadaireAgroCSV,
} from '@/csv/decadaires-agro/parseCSV.js';
import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { toDTO } from '@/db/decadaires-agro/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveDecadairesAgroCSVsToDB({
    directory,
    globber,
    lineReader,
    decadairesAgroRepository,
    saveProgressRepository,
    departement,
    overwrite,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    decadairesAgroRepository: DecadairesAgroRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVsToDB<DecadaireAgroLine, DecadaireAgroDTO>({
        frequence: FREQUENCES.decadaireAgro,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseDecadaireAgroCSV,
        toDTO,
        frequencesRepository: decadairesAgroRepository,
        saveProgressRepository,
        departement,
        overwrite,
        queue,
        deleteCSV,
    });
}
