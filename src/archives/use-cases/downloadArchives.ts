import { Downloader } from '@/archives/download/Downloader.js';
import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { downloadFrequenceArchives } from '@/archives/use-cases/downloadFrequenceArchives.js';
import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

export async function downloadArchives({
    metadataFetcher,
    fileExistenceChecker,
    downloader,
    directory,
    overwrite,
    page = 1,
    pageSize = 999999,
}: {
    metadataFetcher: MetadataFetcher;
    fileExistenceChecker: FileExistenceChecker;
    downloader: Downloader;
    directory: string;
    overwrite: boolean;
    page?: number;
    pageSize?: number;
}): Promise<void> {
    for (const [name, datasetId] of Object.entries(DATASETS_IDS)) {
        LoggerSingleton.getSingleton().info({ message: `Downloading '${name}' :` });
        await downloadFrequenceArchives({
            datasetId,
            metadataFetcher,
            fileExistenceChecker,
            downloader,
            directory,
            overwrite,
            page,
            pageSize,
        });
    }
}
