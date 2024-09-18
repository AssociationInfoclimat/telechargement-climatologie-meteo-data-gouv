import { Downloader } from '@/archives/download/Downloader.js';
import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';

export async function downloadArchive({
    url,
    fileExists,
    download,
    directory,
    overwrite,
}: {
    url: string;
    fileExists: FileExistenceChecker;
    download: Downloader;
    directory: string;
    overwrite: boolean;
}): Promise<void> {
    const filename = url.split('/').pop();
    const filepath = `${directory}/${filename}`;
    if (overwrite || !fileExists(filepath)) {
        await download(url, { directory });
    }
}
