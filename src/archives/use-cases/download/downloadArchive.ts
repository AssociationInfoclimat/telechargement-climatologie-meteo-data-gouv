import { Downloader } from '@/archives/download/Downloader.js';
import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

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
    if (!fileExists(filepath)) {
        LoggerSingleton.getSingleton().info({ message: `Downloading '${url}'` });
        await download(url, { directory });
    } else if (overwrite) {
        LoggerSingleton.getSingleton().info({ message: `Overwriting '${filename}'` });
        await download(url, { directory });
    } else {
        LoggerSingleton.getSingleton().info({ message: `'${filename}' already downloaded` });
    }
}
