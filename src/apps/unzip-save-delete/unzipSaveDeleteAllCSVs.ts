import { Departement } from '@/archives/departements/Departement.js';
import { PrismaDecadairesAgroRepository } from '@/db/decadaires-agro/PrismaRepository.js';
import { PrismaDecadairesRepository } from '@/db/decadaires/PrismaRepository.js';
import { PrismaHorairesRepository } from '@/db/horaires/PrismaRepository.js';
import { PrismaInfrahorairesRepository } from '@/db/infrahoraires/PrismaRepository.js';
import { PrismaMensuellesRepository } from '@/db/mensuelles/PrismaRepository.js';
import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { saveDecadairesAgroArchivesToDB } from '@/decadaires-agro/use-cases/saveArchivesToDB.js';
import { saveDecadairesArchivesToDB } from '@/decadaires/use-cases/saveArchivesToDB.js';
import { saveHorairesArchivesToDB } from '@/horaires/use-cases/saveArchivesToDB.js';
import { saveInfrahorairesArchivesToDB } from '@/infrahoraires/use-cases/saveArchivesToDB.js';
import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { gunzip } from '@/lib/unzip/gunzip.node.js';
import { saveMensuellesArchivesToDB } from '@/mensuelles/use-cases/saveArchivesToDB.js';
import { saveQuotidiennesAutresParametresArchivesToDB } from '@/quotidiennes/autres-parametres/use-cases/saveArchivesToDB.js';
import { saveQuotidiennesArchivesToDB as saveQuotidiennesRRTVentArchivesToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveArchivesToDB.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';
import { unlink } from 'node:fs/promises';
import PQueue from 'p-queue';

export async function deleteCSV(csv: string): Promise<void> {
    await unlink(csv);
}

function parseDepartementsArg(arg?: string): Departement[] | undefined {
    if (!arg) {
        return undefined;
    }
    const departements = arg
        .split(',')
        .map(d => d.trim())
        .filter(d => d.length > 0)
        .map(d => {
            try {
                return Departement.of(d);
            } catch (e) {
                LoggerSingleton.getSingleton().error({ data: e });
                return null;
            }
        })
        .filter((d): d is Departement => d !== null);
    return departements.length > 0 ? departements : undefined;
}

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departements = parseDepartementsArg(process.argv[2]);

    const saveProgressRepository = new PrismaSaveProgressRepository(prisma);

    const overwrite = false;
    const queue = new PQueue({ concurrency: 40 });

    LoggerSingleton.getSingleton().info({ message: 'Reading infrahoraires CSVs :' });
    await saveInfrahorairesArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        infrahorairesRepository: new PrismaInfrahorairesRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading horaires CSVs :' });
    await saveHorairesArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        horairesRepository: new PrismaHorairesRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (RR T Vent) CSVs :' });
    await saveQuotidiennesRRTVentArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        quotidiennesRepository: new PrismaQuotidiennesRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (autres paramètres) CSVs :' });
    await saveQuotidiennesAutresParametresArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        quotidiennesAutresParametresRepository: new PrismaQuotidiennesAutresParametresRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading mensuelles CSVs :' });
    await saveMensuellesArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        mensuellesRepository: new PrismaMensuellesRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires CSVs :' });
    await saveDecadairesArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        decadairesRepository: new PrismaDecadairesRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires agro CSVs :' });
    await saveDecadairesAgroArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        lineReader: readLines,
        decadairesAgroRepository: new PrismaDecadairesAgroRepository({ prisma }),
        saveProgressRepository,
        overwrite,
        departements,
        queue,
        deleteCSV,
    });

    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    console.time();
    await main();
    console.timeEnd();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
