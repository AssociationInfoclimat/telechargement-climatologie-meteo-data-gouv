import { Departement } from '@/archives/departements/Departement.js';
import { PrismaDecadairesAgroRepository } from '@/db/decadaires-agro/PrismaRepository.js';
import { PrismaDecadairesRepository } from '@/db/decadaires/PrismaRepository.js';
import { PrismaHorairesRepository } from '@/db/horaires/PrismaRepository.js';
import { PrismaInfrahorairesRepository } from '@/db/infrahoraires/PrismaRepository.js';
import { PrismaMensuellesRepository } from '@/db/mensuelles/PrismaRepository.js';
import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { saveCSVsToDB as saveDecadairesAgroCSVsToDB } from '@/decadaires-agro/use-cases/saveCSVsToDB.js';
import { saveCSVsToDB as saveDecadairesCSVsToDB } from '@/decadaires/use-cases/saveCSVsToDB.js';
import { saveCSVsToDB as saveHorairesCSVsToDB } from '@/horaires/use-cases/saveCSVsToDB.js';
import { saveCSVsToDB as saveInfrahorairesCSVsToDB } from '@/infrahoraires/use-cases/saveCSVsToDB.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { saveCSVsToDB as saveMensuellesCSVsToDB } from '@/mensuelles/use-cases/saveCSVsToDB.js';
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

    LoggerSingleton.getSingleton().info({ message: 'Reading infrahoraires CSVs :' });
    await saveInfrahorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        infrahorairesRepository: new PrismaInfrahorairesRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading horaires CSVs :' });
    await saveHorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        horairesRepository: new PrismaHorairesRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

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

    LoggerSingleton.getSingleton().info({ message: 'Reading mensuelles CSVs :' });
    await saveMensuellesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        mensuellesRepository: new PrismaMensuellesRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires CSVs :' });
    await saveDecadairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        decadairesRepository: new PrismaDecadairesRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires agro CSVs :' });
    await saveDecadairesAgroCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        decadairesAgroRepository: new PrismaDecadairesAgroRepository({ prisma }),
        saveProgressRepository,
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
