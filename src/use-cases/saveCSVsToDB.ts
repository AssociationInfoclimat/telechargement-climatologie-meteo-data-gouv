import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { CSVParser } from '@/csv/parseCSV.js';
import { FrequenceRepository } from '@/db/Repository.js';
import { DTOAdapter } from '@/db/toDTO.js';
import { Frequence } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveCSVsToDB<L, D>({
    frequence,
    directory,
    globber,
    lineReader,
    lineReadingDebugMessageCreator,
    parseCSV,
    toDTO,
    frequencesRepository,
    saveProgressRepository,
    overwrite,
    departement,
    queue,
    deleteCSV,
}: {
    frequence: Frequence;
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    lineReadingDebugMessageCreator: (line: L) => string;
    parseCSV: CSVParser<L>;
    toDTO: DTOAdapter<L, D>;
    frequencesRepository: FrequenceRepository<D>;
    saveProgressRepository: SaveProgressRepository;
    overwrite: boolean;
    departement?: Departement;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    const csvs = await globFrequence({
        frequence,
        directory,
        glob: globber,
        departement,
    });
    const alreadySaved = await saveProgressRepository.getAlreadySaved();
    for (const csv of csvs) {
        if (alreadySaved.includes(getCSVName(csv))) {
            if (!overwrite) {
                LoggerSingleton.getSingleton().info({ message: `Skipping already saved : '${csv}'` });
                continue;
            }
            LoggerSingleton.getSingleton().info({ message: `Overwriting from : '${csv}'` });
        } else {
            LoggerSingleton.getSingleton().info({ message: `Reading file : '${csv}'` });
        }
        await saveCSVToDB({
            csv,
            readLines: lineReader,
            lineReadingDebugMessageCreator,
            parseCSV,
            toDTO,
            frequencesRepository,
            saveProgressRepository,
            queue,
            deleteCSV,
        });
    }
}
