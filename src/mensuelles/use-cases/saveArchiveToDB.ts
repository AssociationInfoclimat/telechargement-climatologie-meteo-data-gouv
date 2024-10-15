import { createReadingLineDebugMessage, MensuelleLine, parseMensuelleCSV } from '@/csv/mensuelles/parseCSV.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveArchiveToDB } from '@/use-cases/saveArchiveToDB.js';
import PQueue from 'p-queue';

export async function saveMensuellesArchiveToDB({
    gzpath,
    fileExistenceChecker,
    unzipper,
    lineReader,
    toDTO,
    mensuellesRepository,
    saveProgressRepository,
    overwrite,
    queue,
    deleteCSV,
}: {
    gzpath: string;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: MensuelleLine) => string;
    parseCSV: CSVParser<MensuelleLine>;
    toDTO: DTOAdapter<MensuelleLine, MensuelleDTO>;
    mensuellesRepository: MensuellesRepository;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveArchiveToDB<MensuelleLine, MensuelleDTO>({
        gzpath,
        fileExistenceChecker,
        unzipper,
        lineReader,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseMensuelleCSV,
        toDTO,
        frequencesRepository: mensuellesRepository,
        saveProgressRepository,
        overwrite,
        queue,
        deleteCSV,
    });
}
