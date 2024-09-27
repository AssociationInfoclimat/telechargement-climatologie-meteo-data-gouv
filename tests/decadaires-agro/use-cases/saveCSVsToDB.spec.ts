import { InMemoryDecadairesAgroRepository } from '@/db/decadaires-agro/InMemoryRepository.js';
import { saveCSVsToDB } from '@/decadaires-agro/use-cases/saveCSVsToDB.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { createInMemoryLineReader } from '@/lib/fs/read-lines/readLines.in-memory.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { InMemorySaveProgressRepository } from '@/save-progress/db/InMemorySaveProgressRepository.js';
import { assert, describe, it } from 'vitest';

describe('saveCSVsToDB', () => {
    it('should work', async () => {
        const decadairesAgroRepository = new InMemoryDecadairesAgroRepository();
        const saveProgressRepository = new InMemorySaveProgressRepository(['DECADAGRO_01_1940-1949']);
        await saveCSVsToDB({
            directory: '/my/directory',
            globber: createInMemoryGlobber([
                '/my/directory/DECADAGRO_01_previous-1950-2022.csv',
                '/my/directory/DECADAGRO_01_latest-2023-2024.csv',
            ]),
            lineReader: createInMemoryLineReader({
                '/my/directory/DECADAGRO_01_1940-1949.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;NUM_DECADE;RR;CRR;TN;CTN;TX;CTX;FFM;CFFM;TSVM;CTSVM;INST;CINST;GLOT;CGLOT;ETP',
                    '01014002;ARBENT;46.278167;5.669000;534;194001;3;1.1;0;-3.3;0;-3.3;0;1.1;0;1.1;0;4;2;4;2;1.1',
                    '01014002;ARBENT;46.278167;5.669000;534;194002;1;;;;;;;;;;;;;;;',
                    '',
                ],
                '/my/directory/DECADAGRO_01_previous-1950-2022.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;NUM_DECADE;RR;CRR;TN;CTN;TX;CTX;FFM;CFFM;TSVM;CTSVM;INST;CINST;GLOT;CGLOT;ETP',
                    '01014002;ARBENT;46.278167;5.669000;534;202301;1;60.8;0;5.3;0;10.8;0;2.3;0;8.7;0;;;;;',
                    '01014002;ARBENT;46.278167;5.669000;534;202301;2;51.2;0;-1.8;0;6.7;0;1.9;0;6.4;0;;;;;',
                    '',
                ],
                '/my/directory/DECADAGRO_01_latest-2023-2024.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;NUM_DECADE;RR;CRR;TN;CTN;TX;CTX;FFM;CFFM;TSVM;CTSVM;INST;CINST;GLOT;CGLOT;ETP',
                    '01014002;ARBENT;46.278167;5.669000;534;202301;3;1.1;0;-3.3;0;-3.3;0;1.1;0;1.1;0;4;2;4;2;1.1',
                    '01014002;ARBENT;46.278167;5.669000;534;202302;1;;;;;;;;;;;;;;;',
                    '',
                ],
            }),
            decadairesAgroRepository,
            saveProgressRepository,
        });
        assert.sameDeepMembers(await saveProgressRepository.getAlreadySaved(), [
            'DECADAGRO_01_1940-1949',
            'DECADAGRO_01_previous-1950-2022',
            'DECADAGRO_01_latest-2023-2024',
        ]);
        assert.sameDeepMembers(await getArrayFromAsyncGenerator(decadairesAgroRepository.getAll()), [
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMM: new Date('2023-01-01T00:00:00Z'),
                NUM_DECADE: 1,
                RR: 60.8,
                CRR: 0,
                TN: 5.3,
                CTN: 0,
                TX: 10.8,
                CTX: 0,
                FFM: 2.3,
                CFFM: 0,
                TSVM: 8.7,
                CTSVM: 0,
                INST: null,
                CINST: null,
                GLOT: null,
                CGLOT: null,
                ETP: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMM: new Date('2023-01-01T00:00:00Z'),
                NUM_DECADE: 2,
                RR: 51.2,
                CRR: 0,
                TN: -1.8,
                CTN: 0,
                TX: 6.7,
                CTX: 0,
                FFM: 1.9,
                CFFM: 0,
                TSVM: 6.4,
                CTSVM: 0,
                INST: null,
                CINST: null,
                GLOT: null,
                CGLOT: null,
                ETP: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMM: new Date('2023-01-01T00:00:00Z'),
                NUM_DECADE: 3,
                RR: 1.1,
                CRR: 0,
                TN: -3.3,
                CTN: 0,
                TX: -3.3,
                CTX: 0,
                FFM: 1.1,
                CFFM: 0,
                TSVM: 1.1,
                CTSVM: 0,
                INST: 4,
                CINST: 2,
                GLOT: 4,
                CGLOT: 2,
                ETP: 1.1,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMM: new Date('2023-02-01T00:00:00Z'),
                NUM_DECADE: 1,
                RR: null,
                CRR: null,
                TN: null,
                CTN: null,
                TX: null,
                CTX: null,
                FFM: null,
                CFFM: null,
                TSVM: null,
                CTSVM: null,
                INST: null,
                CINST: null,
                GLOT: null,
                CGLOT: null,
                ETP: null,
            },
        ]);
    });
});
