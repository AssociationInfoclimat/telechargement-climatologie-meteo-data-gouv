import { Departement } from '@/archives/departements/Departement.js';
import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { saveCSVsToDB as saveQuotidiennesAutresParametresCSVsToDB } from '@/quotidiennes/autres-parametres/use-cases/saveCSVsToDB.js';
import { saveCSVsToDB as saveQuotidiennesRRTVentCSVsToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveCSVsToDB.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departement: Departement | undefined = Departement.of(974);

    const saveProgressRepository = new PrismaSaveProgressRepository(prisma);

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (RR T Vent) CSVs :' });
    await saveQuotidiennesRRTVentCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        quotidiennesRepository: new PrismaQuotidiennesRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (autres paramètres) CSVs :' });
    await saveQuotidiennesAutresParametresCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        quotidiennesAutresParametresRepository: new PrismaQuotidiennesAutresParametresRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    console.error(e);
    LoggerSingleton.getSingleton().error({ data: e });
}
