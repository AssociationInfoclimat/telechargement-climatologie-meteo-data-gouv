import { Departement } from '@/archives/departements/Departement.js';
import { Frequence } from '@/files/Frequence.js';
import { globFrequence as globFileFrequence } from '@/files/globFrequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';

export function globFrequence({
    frequence,
    departement,
    directory,
    glob,
}: {
    frequence: Frequence;
    departement?: Departement;
    directory: string;
    glob: Globber;
}): Promise<string[]> {
    return globFileFrequence({
        frequence,
        departement,
        extension: 'csv',
        directory,
        glob,
    });
}
