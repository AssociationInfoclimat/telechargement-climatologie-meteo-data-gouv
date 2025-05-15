import { Departement } from '@/archives/departements/Departement.js';
import { createReadingLineDebugMessage, HoraireLine, parseHoraireCSV } from '@/csv/horaires/parseCSV.js';
import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { toDTO } from '@/db/horaires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveHorairesCSVsToDB({
    directory,
    globber,
    lineReader,
    horairesRepository,
    saveProgressRepository,
    departements,
    overwrite,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    horairesRepository: HorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    departements?: Departement[];
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVsToDB<HoraireLine, HoraireDTO>({
        frequence: FREQUENCES.horaire,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseHoraireCSV,
        toDTO,
        frequencesRepository: horairesRepository,
        saveProgressRepository,
        departements,
        overwrite,
        queue,
        deleteCSV,
    });
}
