import { createReadingLineDebugMessage, InfrahoraireLine, parseInfrahoraireCSV } from '@/csv/infrahoraires/parseCSV.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveInfrahorairesArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    infrahorairesRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: InfrahoraireLine) => string;
    parseCSV: CSVParser<InfrahoraireLine>;
    toDTO: DTOAdapter<InfrahoraireLine, InfrahoraireDTO>;
    infrahorairesRepository: InfrahorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<InfrahoraireLine, InfrahoraireDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseInfrahoraireCSV,
        toDTO,
        frequencesRepository: infrahorairesRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
