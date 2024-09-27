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
import { PrismaClient } from '@prisma/client';

async function main() {
    LoggerSingleton.getSingleton().setLogLevel('info');

    LoggerSingleton.getSingleton().info({ message: 'Reading infrahoraires CSVs :' });

    const prisma = new PrismaClient();

    const directory: string = `${process.cwd()}/data`;
    const departement: Departement | undefined = Departement.of(974);

    await saveInfrahorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaInfrahorairesRepository({ prisma }),
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading horaires CSVs :' });
    await saveHorairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaHorairesRepository({ prisma }),
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (RR T Vent) CSVs :' });
    await saveQuotidiennesRRTVentCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaQuotidiennesRepository({ prisma }),
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading quotidiennes (autres paremètres) CSVs :' });
    await saveQuotidiennesAutresParametresCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaQuotidiennesAutresParametresRepository({ prisma }),
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading mensuelles CSVs :' });
    await saveMensuellesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaMensuellesRepository({ prisma }),
        departement,
    });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires CSVs :' });
    await saveDecadairesCSVsToDB({
        directory,
        globber: glob,
        lineReader: readLines,
        repository: new PrismaDecadairesRepository({ prisma }),
        departement,
    });

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
    LoggerSingleton.getSingleton().error({ data: e });
}
