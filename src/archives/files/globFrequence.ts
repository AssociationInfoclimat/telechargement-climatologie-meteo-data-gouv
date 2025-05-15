import { Departement } from '@/archives/departements/Departement.js';
import { Frequence } from '@/files/Frequence.js';
import { globFrequence as globFileFrequence } from '@/files/globFrequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';

export function globFrequence({
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
    return globFileFrequence({
        frequence,
        departements,
        extension: 'csv.gz',
        directory,
        glob,
    });
}
