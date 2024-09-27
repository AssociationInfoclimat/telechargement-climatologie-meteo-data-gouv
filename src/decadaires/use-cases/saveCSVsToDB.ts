import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { saveCSVToDB } from '@/decadaires/use-cases/saveCSVToDB.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';

export async function saveCSVsToDB({
    directory,
    globber,
    lineReader,
    decadairesRepository,
    saveProgressRepository,
    departement,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    decadairesRepository: DecadairesRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
}): Promise<void> {
    const csvs = await globFrequence({
        frequence: FREQUENCES.decadaire,
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
            decadairesRepository,
            saveProgressRepository,
        });
    }
}
