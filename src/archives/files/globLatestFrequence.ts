import { Departement } from '@/archives/departements/Departement.js';
import { Frequence } from '@/files/Frequence.js';
import { globFrequence } from '@/files/globFrequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';

export function globLatestFrequence({
    frequence,
    departements,
    directory,
    glob,
}: {
    frequence: Frequence;
    departements?: Departement[];
    directory: string;
    glob: Globber;
}): Promise<string[]> {
    return globFrequence({
        frequence,
        departements,
        latest: true,
        extension: 'csv.gz',
        directory,
        glob,
    });
}
