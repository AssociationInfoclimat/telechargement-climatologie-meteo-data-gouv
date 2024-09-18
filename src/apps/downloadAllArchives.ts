import { download } from '@/archives/download/download.real.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.meteo-data.js';
import { downloadArchives } from '@/archives/use-cases/downloadArchives.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

async function main(): Promise<void> {
    LoggerSingleton.getSingleton().setLogLevel('info');
    LoggerSingleton.getSingleton().info({ message: 'Downloading all archives...' });
    await downloadArchives({
        metadataFetcher: fetchMetadata,
        downloader: download,
        directory: `${process.cwd()}/data`,
    });
    LoggerSingleton.getSingleton().info({ message: 'Done' });
}

try {
    await main();
} catch (e) {
    LoggerSingleton.getSingleton().error({ data: e });
}
