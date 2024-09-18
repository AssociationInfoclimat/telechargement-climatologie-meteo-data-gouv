import { Downloader } from '@/archives/download/Downloader.js';
import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { downloadFrequenceArchives } from '@/archives/use-cases/downloadFrequenceArchives.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function downloadArchives({
    metadataFetcher,
    downloader,
    directory,
    page = 1,
    pageSize = 999999,
}: {
    metadataFetcher: MetadataFetcher;
    downloader: Downloader;
    directory?: string;
    page?: number;
    pageSize?: number;
}): Promise<void> {
    if (!directory) {
        directory = `${process.cwd()}/data`;
    }
    for (const [name, datasetId] of Object.entries(DATASETS_IDS)) {
        LoggerSingleton.getSingleton().info({ message: `Downloading '${name}' :` });
        await downloadFrequenceArchives({ datasetId, metadataFetcher, downloader, directory, page, pageSize });
    }
}
