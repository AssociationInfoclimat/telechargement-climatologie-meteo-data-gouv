import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { saveCSVToDB } from '@/quotidiennes/autres-parametres/use-cases/saveCSVToDB.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';

export async function saveCSVsToDB({
    directory,
    globber,
    lineReader,
    quotidiennesAutresParametresRepository,
    saveProgressRepository,
    departement,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    quotidiennesAutresParametresRepository: QuotidiennesAutresParametresRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
}): Promise<void> {
    const csvs = await globFrequence({
        frequence: FREQUENCES.quotidienneAutresParametres,
        directory,
        glob: globber,
        departement,
    });
    const alreadySaved = await saveProgressRepository.getAlreadySaved();
    for (const csv of csvs) {
        if (alreadySaved.includes(getCSVName(csv))) {
            LoggerSingleton.getSingleton().info({
                message: `Skipping already saved : '${csv}'`,
            });
            continue;
        }
        LoggerSingleton.getSingleton().info({
            message: `Reading file : '${csv}'`,
        });
        await saveCSVToDB({
            csv,
            readLines: lineReader,
            quotidiennesAutresParametresRepository,
            saveProgressRepository,
        });
    }
}
