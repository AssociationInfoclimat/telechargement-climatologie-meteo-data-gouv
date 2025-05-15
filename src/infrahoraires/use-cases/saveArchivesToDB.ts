import { Departement } from '@/archives/departements/Departement.js';
import { createReadingLineDebugMessage, InfrahoraireLine, parseInfrahoraireCSV } from '@/csv/infrahoraires/parseCSV.js';
import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { toDTO } from '@/db/infrahoraires/toDTO.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchivesToDB } from '@/use-cases/saveArchivesToDB.js';
import PQueue from 'p-queue';

export async function saveInfrahorairesArchivesToDB({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    lineReader,
    infrahorairesRepository,
    saveProgressRepository,
    overwrite,
    departements,
    queue,
    deleteCSV,
}: {
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    infrahorairesRepository: InfrahorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    departements?: Departement[];
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchivesToDB<InfrahoraireLine, InfrahoraireDTO>({
        frequence: FREQUENCES.infrahoraire,
        directory,
        globber,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseInfrahoraireCSV,
        toDTO,
        frequencesRepository: infrahorairesRepository,
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });
}
