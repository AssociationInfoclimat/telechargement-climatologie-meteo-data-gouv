import { Departement } from '@/archives/departements/Departement.js';
import { globFrequence } from '@/csv/files/globFrequence.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { describe, expect, it } from 'vitest';

describe('globFrequence', () => {
    it('should return files corresponding to the frequency', async () => {
        const directory = '/my/directory';
        const globber = createInMemoryGlobber([
            '/my/directory/MN_01_blabla.csv',
            '/my/directory/MN_76_blabla.csv',
            '/my/directory/MN_76_blabla.gz',
            '/my/directory/H_01_blabla.csv',
            '/my/directory/H_76_blabla.csv',
            '/my/directory/H_76_blabla.gz',
            '/my/directory/Q_01_blabla_RR-T-Vent.csv',
            '/my/directory/Q_76_blabla_RR-T-Vent.csv',
            '/my/directory/Q_76_blabla_RR-T-Vent.gz',
            '/my/directory/Q_01_blabla_autres-parametres.csv',
            '/my/directory/Q_76_blabla_autres-parametres.csv',
            '/my/directory/Q_76_blabla_autres-parametres.gz',
            '/my/directory/MENSQ_01_blabla.csv',
            '/my/directory/MENSQ_76_blabla.csv',
            '/my/directory/MENSQ_76_blabla.gz',
            '/my/directory/DECADQ_01_blabla.csv',
            '/my/directory/DECADQ_76_blabla.csv',
            '/my/directory/DECADQ_76_blabla.gz',
            '/my/directory/DECADAGRO_01_blabla.csv',
            '/my/directory/DECADAGRO_76_blabla.csv',
            '/my/directory/DECADAGRO_76_blabla.gz',
        ]);
        expect(await globFrequence({ frequence: FREQUENCES.infrahoraire, directory, glob: globber })).toEqual([
            '/my/directory/MN_01_blabla.csv',
            '/my/directory/MN_76_blabla.csv',
        ]);
        expect(await globFrequence({ frequence: FREQUENCES.decadaireAgro, directory, glob: globber })).toEqual([
            '/my/directory/DECADAGRO_01_blabla.csv',
            '/my/directory/DECADAGRO_76_blabla.csv',
        ]);
        expect(await globFrequence({ frequence: FREQUENCES.quotidienne, directory, glob: globber })).toEqual([
            '/my/directory/Q_01_blabla_RR-T-Vent.csv',
            '/my/directory/Q_76_blabla_RR-T-Vent.csv',
        ]);
        expect(
            await globFrequence({ frequence: FREQUENCES.quotidienneAutresParametres, directory, glob: globber })
        ).toEqual([
            '/my/directory/Q_01_blabla_autres-parametres.csv',
            '/my/directory/Q_76_blabla_autres-parametres.csv',
        ]);
        expect(
            await globFrequence({
                frequence: FREQUENCES.horaire,
                directory,
                glob: globber,
                departement: Departement.of(76),
            })
        ).toEqual(['/my/directory/H_76_blabla.csv']);
    });
});
