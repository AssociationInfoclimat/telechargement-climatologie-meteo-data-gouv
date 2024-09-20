import { Departement } from '@/archives/departements/Departement.js';
import { Downloader } from '@/archives/download/Downloader.js';
import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { getURLs } from '@/archives/url/getURLs.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { downloadArchive } from '@/archives/use-cases/download/downloadArchive.js';
import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';

export async function downloadFrequenceArchives({
    datasetId,
    metadataFetcher,
    fileExistenceChecker,
    downloader,
    directory,
    overwrite,
    page = 1,
    pageSize = 999999,
    departement,
}: {
    datasetId: DatasetId;
    metadataFetcher: MetadataFetcher;
    fileExistenceChecker: FileExistenceChecker;
    downloader: Downloader;
    directory: string;
    overwrite: boolean;
    page?: number;
    pageSize?: number;
    departement?: Departement;
}): Promise<void> {
    const urls = await getURLs({
        datasetId,
        fetchMetadata: metadataFetcher,
        page,
        pageSize,
        departement,
    });
    for (const url of urls) {
        await downloadArchive({
            url,
            fileExists: fileExistenceChecker,
            download: downloader,
            directory,
            overwrite,
        });
    }
}
