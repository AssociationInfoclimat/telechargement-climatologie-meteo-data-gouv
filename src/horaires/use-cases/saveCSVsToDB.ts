import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { getCSVName } from '@/csv/getCSVName.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { saveCSVToDB } from '@/horaires/use-cases/saveCSVToDB.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';

export async function saveCSVsToDB({
    directory,
    globber,
    lineReader,
    horairesRepository,
    saveProgressRepository,
    departement,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    horairesRepository: HorairesRepository;
    saveProgressRepository: SaveProgressRepository;
    departement?: Departement;
}): Promise<void> {
    const csvs = await globFrequence({
        frequence: FREQUENCES.horaire,
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
            horairesRepository,
            saveProgressRepository,
        });
    }
}
