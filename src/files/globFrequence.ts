import { Departement } from '@/archives/departements/Departement.js';
import { Frequence, FREQUENCES } from '@/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { join } from 'node:path';

export async function globFrequence({
    frequence,
    departements,
    latest = false,
    extension,
    directory,
    glob,
}: {
    frequence: Frequence;
    departements?: Departement[];
    latest?: boolean;
    extension: 'csv' | 'csv.gz';
    directory: string;
    glob: Globber;
}): Promise<string[]> {
    const prefix = frequence.split('_')[0];
    const suffix =
        frequence === FREQUENCES.quotidienne || frequence === FREQUENCES.quotidienneAutresParametres ?
            `_${frequence.split('_')[1]}`
        :   '';
    const departementList = departements && departements.length > 0 ? departements : [undefined];

    function makePattern(comp: boolean, departement?: Departement) {
        return join(
            directory,
            `${prefix}${comp ? '-COMP' : ''}_${departement ? `${departement}_` : '*'}${latest ? 'latest-' : '*'}*${suffix}.${extension}`
        );
    }

    const allResults = await Promise.all(
        departementList.map(async departement => {
            const normal = await glob(makePattern(false, departement));
            const comp = await glob(makePattern(true, departement));
            return [...normal, ...comp];
        })
    );

    return allResults.flat();
}
