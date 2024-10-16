import { Departement } from '@/archives/departements/Departement.js';
import { Frequence, FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { join } from 'node:path';

export async function globFrequence({
    frequence,
    departement,
    extension,
    directory,
    glob,
}: {
    frequence: Frequence;
    departement?: Departement;
    extension: 'csv' | 'csv.gz';
    directory: string;
    glob: Globber;
}): Promise<string[]> {
    const prefix = frequence.split('_')[0];
    const suffix =
        frequence === FREQUENCES.quotidienne || frequence === FREQUENCES.quotidienneAutresParametres ?
            `_${frequence.split('_')[1]}`
        :   '';
    const normal = await glob(
        join(directory, `${prefix}_${departement ? `${departement}_` : ''}*${suffix}.${extension}`)
    );
    const comp = await glob(
        join(directory, `${prefix}-COMP_${departement ? `${departement}_` : ''}*${suffix}.${extension}`)
    );
    return [...normal, ...comp];
}
