import { Departement } from '@/archives/departements/Departement.js';
import { PrismaDecadairesAgroRepository } from '@/db/decadaires-agro/PrismaRepository.js';
import { saveCSVsToDB as saveDecadairesAgroCSVsToDB } from '@/decadaires-agro/use-cases/saveCSVsToDB.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    LoggerSingleton.getSingleton().info({ message: 'Reading infrahoraires CSVs :' });

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departement: Departement | undefined = Departement.of(974);

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires agro CSVs :' });
    await saveDecadairesAgroCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaDecadairesAgroRepository({ prisma }),
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
