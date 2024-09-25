import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/archives/files/globFrequence.js';
import { unzipArchive } from '@/archives/use-cases/unzip/unzipArchive.js';
import { Frequence } from '@/files/Frequence.js';
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
    departement,
}: {
    frequence: Frequence;
    directory: string;
    globber: Globber;
    fileExistenceChecker: FileExistenceChecker;
    unzipper: Unzipper;
    overwrite: boolean;
    departement?: Departement;
}): Promise<void> {
    const paths = await globFrequence({ frequence, directory, glob: globber, departement });
    for (const path of paths) {
        await unzipArchive({
            gzpath: path,
            gunzip: unzipper,
            fileExists: fileExistenceChecker,
            overwrite,
        });
    }
}
