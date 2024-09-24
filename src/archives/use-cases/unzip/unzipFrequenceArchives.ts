import { Frequence } from '@/archives/files/Frequence.js';
import { globFrequence } from '@/archives/files/globFrequence.js';
import { unzipArchive } from '@/archives/use-cases/unzip/unzipArchive.js';
import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';

export async function unzipFrequenceArchives({
    frequence,
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    overwrite,
}: {
    frequence: Frequence;
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    overwrite: boolean;
}): Promise<void> {
    const paths = await globFrequence({ frequence, directory, glob: globber });
    for (const path of paths) {
        await unzipArchive({
            gzpath: path,
            gunzip: unzipper,
            fileExists: fileExistenceChecker,
            overwrite,
        });
    }
}
