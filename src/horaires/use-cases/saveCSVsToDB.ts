import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { saveCSVToDB } from '@/horaires/use-cases/saveCSVToDB.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function saveCSVsToDB({
    directory,
    globber,
    lineReader,
    repository,
    departement,
}: {
    directory: string;
    globber: Globber;
    lineReader: LineReader;
    repository: HorairesRepository;
    departement?: Departement;
}): Promise<void> {
    const csvs = await globFrequence({
        frequence: FREQUENCES.horaire,
        directory,
        glob: globber,
        departement,
    });
    for (const csv of csvs) {
        LoggerSingleton.getSingleton().info({
            message: `Reading file : '${csv}'`,
        });
        await saveCSVToDB({
            csv,
            readLines: lineReader,
            repository,
        });
    }
}
