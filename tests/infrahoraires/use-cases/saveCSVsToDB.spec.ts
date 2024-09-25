import { InMemoryInfrahorairesRepository } from '@/db/infrahoraires/InMemoryRepository.js';
import { saveCSVsToDB } from '@/infrahoraires/use-cases/saveCSVsToDB.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { createInMemoryLineReader } from '@/lib/fs/read-lines/readLines.in-memory.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { assert, describe, it } from 'vitest';

describe('saveCSVsToDB', () => {
    it('should work', async () => {
        const repository = new InMemoryInfrahorairesRepository();
        await saveCSVsToDB({
            directory: '/my/directory',
            globber: createInMemoryGlobber([
                '/my/directory/MN_01_previous-1950-2022.csv',
                '/my/directory/MN_01_latest-2023-2024.csv',
            ]),
            lineReader: createInMemoryLineReader({
                '/my/directory/MN_01_previous-1950-2022.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200507010000;0.200;9',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200507010006;2.600;9',
                    '',
                ],
                '/my/directory/MN_01_latest-2023-2024.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200507010012;;',
                    '',
                ],
            }),
            repository,
        });
        assert.sameDeepMembers(await getArrayFromAsyncGenerator(repository.getAll()), [
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2005-07-01T00:00:00Z'),
                RR: 0.2,
                QRR: 9,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2005-07-01T00:06:00Z'),
                RR: 2.6,
                QRR: 9,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2005-07-01T00:12:00Z'),
                RR: null,
                QRR: null,
            },
        ]);
    });
});
