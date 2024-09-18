import { download } from '@/archives/download/download.real.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.meteo-data.js';
import { downloadArchives } from '@/archives/use-cases/download/downloadArchives.js';
import { fileExists } from '@/lib/fs/fileExists.node.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    LoggerSingleton.getSingleton().info({ message: 'Downloading all archives...' });
    await downloadArchives({
        metadataFetcher: fetchMetadata,
        fileExistenceChecker: fileExists,
        downloader: download,
        directory: `${process.cwd()}/data`,
        overwrite: false,
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
