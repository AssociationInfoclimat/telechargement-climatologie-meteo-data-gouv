import { createReadingLineDebugMessage, HoraireLine, parseHoraireCSV } from '@/csv/horaires/parseCSV.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveHorairesArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    horairesRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: HoraireLine) => string;
    parseCSV: CSVParser<HoraireLine>;
    toDTO: DTOAdapter<HoraireLine, HoraireDTO>;
    horairesRepository: HorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<HoraireLine, HoraireDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseHoraireCSV,
        toDTO,
        frequencesRepository: horairesRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
