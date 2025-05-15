import { Departement } from '@/archives/departements/Departement.js';
import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { gunzip } from '@/lib/unzip/gunzip.node.js';
import { saveQuotidiennesAutresParametresArchivesToDB } from '@/quotidiennes/autres-parametres/use-cases/saveArchivesToDB.js';
import { saveQuotidiennesArchivesToDB as saveQuotidiennesRRTVentArchivesToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveArchivesToDB.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';
import { unlink } from 'node:fs/promises';
import PQueue from 'p-queue';

export async function deleteCSV(csv: string): Promise<void> {
    await unlink(csv);
}

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departements: Departement[] | undefined = [Departement.of(76)];

    const saveProgressRepository = new PrismaSaveProgressRepository(prisma);

    const overwrite = false;
    const queue = new PQueue({ concurrency: 10 });

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

    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    console.time();
    await main();
    console.timeEnd();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
