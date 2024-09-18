import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';

export async function unzipArchive({
    gzpath,
    fileExists,
    gunzip,
    overwrite,
}: {
    gzpath: string;
    fileExists: FileExistenceChecker;
    gunzip: Unzipper;
    overwrite: boolean;
}): Promise<void> {
    const csvpath = gzpath.replace('.gz', '');
    if (!fileExists(csvpath)) {
        LoggerSingleton.getSingleton().info({ message: `Unzipping '${gzpath}'` });
        await gunzip(gzpath, csvpath);
    } else if (overwrite) {
        LoggerSingleton.getSingleton().info({ message: `Overwriting '${csvpath}'` });
        await gunzip(gzpath, csvpath);
    } else {
        LoggerSingleton.getSingleton().info({ message: `'${csvpath}' already unzipped` });
    }
}
