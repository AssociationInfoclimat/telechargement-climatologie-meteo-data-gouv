import { Departement } from '@/archives/departements/Departement.js';
import { globLatestFrequence } from '@/csv/files/globLatestFrequence.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { assert, describe, it } from 'vitest';

describe('globLatestFrequence', () => {
    it('should return files corresponding to the frequency', async () => {
        const directory = '/my/directory';
        const globber = createInMemoryGlobber([
            '/my/directory/MN_01_blabla.csv',
            '/my/directory/MN-COMP_01_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/MN_29_blabla.csv',
            '/my/directory/MN-COMP_29_blabla.csv',
            '/my/directory/MN_76_blabla.csv',
            '/my/directory/MN_76_blabla.csv.gz',
            '/my/directory/MN_76_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/MN_76_latest-YYYY-ZZZZ_blabla.csv.gz',
            '/my/directory/H_01_blabla.csv',
            '/my/directory/H-COMP_01_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/H_29_blabla.csv',
            '/my/directory/H_29_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/H-COMP_29_blabla.csv',
            '/my/directory/H_76_blabla.csv',
            '/my/directory/H_76_blabla.csv.gz',
            '/my/directory/H_76_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/H_76_latest-YYYY-ZZZZ_blabla.csv.gz',
            '/my/directory/Q_01_blabla_RR-T-Vent.csv',
            '/my/directory/Q-COMP_01_latest-YYYY-ZZZZ_RR-T-Vent.csv',
            '/my/directory/Q_29_blabla_RR-T-Vent.csv',
            '/my/directory/Q-COMP_29_blabla_RR-T-Vent.csv',
            '/my/directory/Q_76_blabla_RR-T-Vent.csv',
            '/my/directory/Q_76_blabla_RR-T-Vent.csv.gz',
            '/my/directory/Q_76_latest-YYYY-ZZZZ_RR-T-Vent.csv',
            '/my/directory/Q_76_latest-YYYY-ZZZZ_RR-T-Vent.csv.gz',
            '/my/directory/Q_01_blabla_autres-parametres.csv',
            '/my/directory/Q-COMP_01_latest-YYYY-ZZZZ_autres-parametres.csv',
            '/my/directory/Q_29_blabla_autres-parametres.csv',
            '/my/directory/Q-COMP_29_blabla_autres-parametres.csv',
            '/my/directory/Q_76_blabla_autres-parametres.csv',
            '/my/directory/Q_76_blabla_autres-parametres.csv.gz',
            '/my/directory/Q_76_latest-YYYY-ZZZZ_autres-parametres.csv',
            '/my/directory/Q_76_latest-YYYY-ZZZZ_autres-parametres.csv.gz',
            '/my/directory/MENSQ_01_blabla.csv',
            '/my/directory/MENSQ-COMP_01_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/MENSQ_29_blabla.csv',
            '/my/directory/MENSQ-COMP_29_blabla.csv',
            '/my/directory/MENSQ_76_blabla.csv',
            '/my/directory/MENSQ_76_blabla.csv.gz',
            '/my/directory/MENSQ_76_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/MENSQ_76_latest-YYYY-ZZZZ_blabla.csv.gz',
            '/my/directory/DECADQ_01_blabla.csv',
            '/my/directory/DECADQ-COMP_01_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/DECADQ_29_blabla.csv',
            '/my/directory/DECADQ-COMP_29_blabla.csv',
            '/my/directory/DECADQ_76_blabla.csv',
            '/my/directory/DECADQ_76_blabla.csv.gz',
            '/my/directory/DECADQ_76_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/DECADQ_76_latest-YYYY-ZZZZ_blabla.csv.gz',
            '/my/directory/DECADAGRO_01_blabla.csv',
            '/my/directory/DECADAGRO-COMP_01_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/DECADAGRO_29_blabla.csv',
            '/my/directory/DECADAGRO-COMP_29_blabla.csv',
            '/my/directory/DECADAGRO_76_blabla.csv',
            '/my/directory/DECADAGRO_76_blabla.csv.gz',
            '/my/directory/DECADAGRO_76_latest-YYYY-ZZZZ_blabla.csv',
            '/my/directory/DECADAGRO_76_latest-YYYY-ZZZZ_blabla.csv.gz',
        ]);
        assert.sameMembers(
            await globLatestFrequence({ frequence: FREQUENCES.infrahoraire, directory, glob: globber }),
            ['/my/directory/MN-COMP_01_latest-YYYY-ZZZZ_blabla.csv', '/my/directory/MN_76_latest-YYYY-ZZZZ_blabla.csv']
        );
        assert.sameMembers(
            await globLatestFrequence({ frequence: FREQUENCES.decadaireAgro, directory, glob: globber }),
            [
                '/my/directory/DECADAGRO-COMP_01_latest-YYYY-ZZZZ_blabla.csv',
                '/my/directory/DECADAGRO_76_latest-YYYY-ZZZZ_blabla.csv',
            ]
        );
        assert.sameMembers(await globLatestFrequence({ frequence: FREQUENCES.quotidienne, directory, glob: globber }), [
            '/my/directory/Q-COMP_01_latest-YYYY-ZZZZ_RR-T-Vent.csv',
            '/my/directory/Q_76_latest-YYYY-ZZZZ_RR-T-Vent.csv',
        ]);
        assert.sameMembers(
            await globLatestFrequence({ frequence: FREQUENCES.quotidienneAutresParametres, directory, glob: globber }),
            [
                '/my/directory/Q-COMP_01_latest-YYYY-ZZZZ_autres-parametres.csv',
                '/my/directory/Q_76_latest-YYYY-ZZZZ_autres-parametres.csv',
            ]
        );
        assert.sameMembers(
            await globLatestFrequence({
                frequence: FREQUENCES.horaire,
                directory,
                glob: globber,
                departements: [Departement.of(1)],
            }),
            ['/my/directory/H-COMP_01_latest-YYYY-ZZZZ_blabla.csv']
        );
        assert.sameMembers(
            await globLatestFrequence({
                frequence: FREQUENCES.horaire,
                directory,
                glob: globber,
                departements: [Departement.of(29), Departement.of(76)],
            }),
            ['/my/directory/H_29_latest-YYYY-ZZZZ_blabla.csv', '/my/directory/H_76_latest-YYYY-ZZZZ_blabla.csv']
        );
    });
});
