import { Departement } from '@/archives/departements/Departement.js';
import { Frequence } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { join } from 'node:path';

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
    return glob(join(directory, `${frequence}_${departement ? `${departement}_` : ''}*.csv`));
}
