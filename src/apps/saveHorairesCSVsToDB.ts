import { Departement } from '@/archives/departements/Departement.js';
import { PrismaHorairesRepository } from '@/db/horaires/PrismaRepository.js';
import { saveCSVsToDB as saveHorairesCSVsToDB } from '@/horaires/use-cases/saveCSVsToDB.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departement: Departement | undefined = Departement.of(974);

    LoggerSingleton.getSingleton().info({ message: 'Reading horaires CSVs :' });
    await saveHorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        horairesRepository: new PrismaHorairesRepository({ prisma }),
        saveProgressRepository: new PrismaSaveProgressRepository(prisma),
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
