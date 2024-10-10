import { Departement } from '@/archives/departements/Departement.js';
import { MensuelleLine, parseMensuelleCSV } from '@/csv/mensuelles/parseCSV.js';
import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';
import { toDTO } from '@/db/mensuelles/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveMensuellesCSVsToDB({
    directory,
    globber,
    lineReader,
    mensuellesRepository,
    saveProgressRepository,
    departement,
    queue,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    mensuellesRepository: MensuellesRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    queue?: PQueue;
}): Promise<void> {
    await saveCSVsToDB<MensuelleLine, MensuelleDTO>({
        frequence: FREQUENCES.mensuelle,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}`,
        parseCSV: parseMensuelleCSV,
        toDTO,
        frequencesRepository: mensuellesRepository,
        saveProgressRepository,
        departement,
        queue,
    });
}
