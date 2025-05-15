import { Departement } from '@/archives/departements/Departement.js';
import { PrismaDecadairesAgroRepository } from '@/db/decadaires-agro/PrismaRepository.js';
import { PrismaDecadairesRepository } from '@/db/decadaires/PrismaRepository.js';
import { PrismaHorairesRepository } from '@/db/horaires/PrismaRepository.js';
import { PrismaInfrahorairesRepository } from '@/db/infrahoraires/PrismaRepository.js';
import { PrismaMensuellesRepository } from '@/db/mensuelles/PrismaRepository.js';
import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { saveDecadairesAgroCSVsToDB } from '@/decadaires-agro/use-cases/saveCSVsToDB.js';
import { saveDecadairesCSVsToDB } from '@/decadaires/use-cases/saveCSVsToDB.js';
import { saveHorairesCSVsToDB } from '@/horaires/use-cases/saveCSVsToDB.js';
import { saveInfrahorairesCSVsToDB } from '@/infrahoraires/use-cases/saveCSVsToDB.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { saveMensuellesCSVsToDB } from '@/mensuelles/use-cases/saveCSVsToDB.js';
import { saveQuotidiennesAutresParametresCSVsToDB } from '@/quotidiennes/autres-parametres/use-cases/saveCSVsToDB.js';
import { saveQuotidiennesCSVsToDB as saveQuotidiennesRRTVentCSVsToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveCSVsToDB.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';
import PQueue from 'p-queue';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departements: Departement[] | undefined = [Departement.of(76)];

    const saveProgressRepository = new PrismaSaveProgressRepository(prisma);

    const overwrite = false;
    const queue = new PQueue({ concurrency: 50 });

    LoggerSingleton.getSingleton().info({ message: 'Reading infrahoraires CSVs :' });

    await saveInfrahorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        infrahorairesRepository: new PrismaInfrahorairesRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading horaires CSVs :' });
    await saveHorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        horairesRepository: new PrismaHorairesRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (RR T Vent) CSVs :' });
    await saveQuotidiennesRRTVentCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        quotidiennesRepository: new PrismaQuotidiennesRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (autres paramètres) CSVs :' });
    await saveQuotidiennesAutresParametresCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        quotidiennesAutresParametresRepository: new PrismaQuotidiennesAutresParametresRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading mensuelles CSVs :' });
    await saveMensuellesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        mensuellesRepository: new PrismaMensuellesRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires CSVs :' });
    await saveDecadairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        decadairesRepository: new PrismaDecadairesRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires agro CSVs :' });
    await saveDecadairesAgroCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        decadairesAgroRepository: new PrismaDecadairesAgroRepository({ prisma }),
        saveProgressRepository,
        departements,
        overwrite,
        queue,
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
