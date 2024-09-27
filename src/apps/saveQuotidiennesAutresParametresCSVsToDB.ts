import { Departement } from '@/archives/departements/Departement.js';
import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { saveCSVsToDB as saveQuotidiennesAutresParametresCSVsToDB } from '@/quotidiennes/autres-parametres/use-cases/saveCSVsToDB.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    LoggerSingleton.getSingleton().info({ message: 'Reading infrahoraires CSVs :' });

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departement: Departement | undefined = Departement.of(974);

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (autres paremètres) CSVs :' });
    await saveQuotidiennesAutresParametresCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaQuotidiennesAutresParametresRepository({ prisma }),
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
