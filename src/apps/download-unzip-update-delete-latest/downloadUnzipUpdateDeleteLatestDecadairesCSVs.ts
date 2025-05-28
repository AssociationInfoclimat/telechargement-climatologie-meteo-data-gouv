import { parseDepartementsArg } from '@/cli/parseDepartementsArg.js';
import { PrismaDecadairesRepository } from '@/db/decadaires/PrismaRepository.js';
import { saveLatestDecadairesArchivesToDB } from '@/decadaires/use-cases/saveLatestArchivesToDB.js';
import { createMonthGrepper } from '@/files/grep/createMonthGrepper.js';
import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { grep } from '@/lib/fs/grep/grep.exec.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { gunzip } from '@/lib/unzip/gunzip.node.js';
import { FileSaveHistoryRepository } from '@/save-history/db/PrismaSaveHistoryRepository.js';
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
    const departements = parseDepartementsArg(process.argv[2]);

    const saveHistoryRepository = new FileSaveHistoryRepository(`${process.cwd()}/save-history.txt`);

    const queue = new PQueue({ concurrency: 10 }); // new PQueue({ concurrency: Math.round(Number.MAX_SAFE_INTEGER / 20) });

    LoggerSingleton.getSingleton().info({ message: 'Reading decadaires CSVs :' });
    await saveLatestDecadairesArchivesToDB({
        directory,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        dateGrepper: createMonthGrepper(grep, -1),
        lineReader: readLines,
        // decadairesRepository: new DiscardRepository(),
        decadairesRepository: new PrismaDecadairesRepository({ prisma }),
        saveHistoryRepository,
        currentDate: new Date(),
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
