import { Departement } from '@/archives/departements/Departement.js';
import { Frequence, FREQUENCES } from '@/files/Frequence.js';
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
    const prefix = frequence.split('_')[0];
    const suffix =
        frequence === FREQUENCES.quotidienne || frequence === FREQUENCES.quotidienneAutresParametres ?
            `_${frequence.split('_')[1]}`
        :   '';
    return glob(join(directory, `${prefix}_${departement ? `${departement}_` : ''}*${suffix}.csv`));
}
