import { unzipArchives } from '@/archives/use-cases/unzip/unzipArchives.js';
import { fileExists } from '@/lib/fs/fileExists.node.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { gunzip } from '@/lib/unzip/gunzip.node.js';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    LoggerSingleton.getSingleton().info({ message: 'Unzipping remaining archives...' });
    await unzipArchives({
        directory: `${process.cwd()}/data`,
        globber: glob,
        fileExistenceChecker: fileExists,
        unzipper: gunzip,
        overwrite: false,
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
