import { Departement } from '@/archives/departements/Departement.js';
import { PrismaInfrahorairesRepository } from '@/db/infrahoraires/PrismaRepository.js';
import { saveInfrahorairesArchivesToDB } from '@/infrahoraires/use-cases/saveArchivesToDB.js';
import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { gunzip } from '@/lib/unzip/gunzip.node.js';
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
    const departement: Departement | undefined = Departement.of(974);

    const saveProgressRepository = new PrismaSaveProgressRepository(prisma);

    const overwrite = false;
    const queue = new PQueue({ concurrency: 10 });

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
        departement,
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
