import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { saveCSVToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveCSVToDB.js';

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
    repository: QuotidiennesRepository;
    departement?: Departement;
}): Promise<void> {
    const csvs = await globFrequence({
        frequence: FREQUENCES.quotidienne,
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
