import { Departement } from '@/archives/departements/Departement.js';
import { InfrahoraireLine, parseInfrahoraireCSV } from '@/csv/infrahoraires/parseCSV.js';
import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { toDTO } from '@/db/infrahoraires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVsToDB } from '@/use-cases/saveCSVsToDB.js';
import PQueue from 'p-queue';

export async function saveInfrahorairesCSVsToDB({
    directory,
    globber,
    lineReader,
    infrahorairesRepository,
    saveProgressRepository,
    departement,
    queue,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    infrahorairesRepository: InfrahorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
    queue?: PQueue;
}): Promise<void> {
    await saveCSVsToDB<InfrahoraireLine, InfrahoraireDTO>({
        frequence: FREQUENCES.infrahoraire,
        directory,
        globber,
        lineReader,
        lineReadingDebugMessageCreator: line =>
            `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHHMN.toISOString()}`,
        parseCSV: parseInfrahoraireCSV,
        toDTO,
        frequencesRepository: infrahorairesRepository,
        saveProgressRepository,
        departement,
        queue,
    });
}
