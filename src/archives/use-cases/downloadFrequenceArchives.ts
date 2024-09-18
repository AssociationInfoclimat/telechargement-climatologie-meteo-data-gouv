import { Downloader } from '@/archives/download/Downloader.js';
import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { getURLs } from '@/archives/url/getURLs.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { downloadArchive } from '@/archives/use-cases/downloadArchive.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function downloadFrequenceArchives({
    datasetId,
    metadataFetcher,
    downloader,
    directory,
    page = 1,
    pageSize = 999999,
}: {
    datasetId: DatasetId;
    metadataFetcher: MetadataFetcher;
    downloader: Downloader;
    directory?: string;
    page?: number;
    pageSize?: number;
}): Promise<void> {
    if (!directory) {
        directory = `${process.cwd()}/data`;
    }
    const urls = await getURLs({ datasetId, fetchMetadata: metadataFetcher, page, pageSize });
    for (const url of urls) {
        LoggerSingleton.getSingleton().info({ message: `Downloading '${url}'` });
        await downloadArchive({ url, download: downloader, directory });
    }
}
