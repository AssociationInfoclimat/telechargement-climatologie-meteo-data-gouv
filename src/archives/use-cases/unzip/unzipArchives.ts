import { FREQUENCES } from '@/archives/files/Frequence.js';
import { unzipFrequenceArchives } from '@/archives/use-cases/unzip/unzipFrequenceArchives.js';
import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';

export async function unzipArchives({
    directory,
    globber,
    fileExistenceChecker,
    unzipper,
    overwrite,
}: {
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    overwrite: boolean;
}): Promise<void> {
    for (const [name, frequence] of Object.entries(FREQUENCES)) {
        LoggerSingleton.getSingleton().info({ message: `Unzipping '${name}' :` });
        await unzipFrequenceArchives({
            frequence,
            directory,
            globber,
            unzipper,
            fileExistenceChecker,
            overwrite,
        });
    }
}
