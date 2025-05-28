import { InMemoryInfrahorairesRepository } from '@/db/infrahoraires/InMemoryRepository.js';
import { createDayGrepper } from '@/files/grep/createDayGrepper.js';
import { saveLatestInfrahorairesArchivesToDB } from '@/infrahoraires/use-cases/saveLatestArchivesToDB.js';
import { InMemoryFileSystem } from '@/lib/fs/file-exists/fileExists.in-memory.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { createInMemoryGrepper, GrepperSpy } from '@/lib/fs/grep/grep.in-memory.js';
import { createInMemoryLineReader } from '@/lib/fs/read-lines/readLines.in-memory.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { createInMemoryUnzipper, UnzipperSpy } from '@/lib/unzip/gunzip.in-memory.js';
import { InMemorySaveHistoryRepository } from '@/save-history/db/InMemorySaveHistoryRepository.js';
import { assert, describe, expect, it } from 'vitest';

describe('saveLatestArchivesToDB', () => {
    it('should read all lines', async () => {
        const infrahorairesRepository = new InMemoryInfrahorairesRepository();
        const currentDate = new Date('2000-06-17T18:30:45Z');
        const saveHistoryRepository = new InMemorySaveHistoryRepository({ saved: null, currentDate });
        const fs = new InMemoryFileSystem();
        const grepperSpy = new GrepperSpy();
        await saveLatestInfrahorairesArchivesToDB({
            directory: '/my/directory',
            globber: createInMemoryGlobber([
                '/my/directory/MN_01_1940-1949.csv',
                '/my/directory/MN_01_previous-1950-2022.csv',
                '/my/directory/MN_01_latest-2023-2024.csv.gz',
                '/my/directory/MN_01_latest-2023-2024.csv',
            ]),
            fileExistenceChecker: fs.getFileExistenceChecker(),
            unzipper: createInMemoryUnzipper(new UnzipperSpy({ fs })),
            dateGrepper: createDayGrepper(createInMemoryGrepper(grepperSpy)),
            lineReader: createInMemoryLineReader({
                '/my/directory/MN_01_1940-1949.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151230;0.200;9',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151236;2.600;9',
                    '',
                ],
                '/my/directory/MN_01_previous-1950-2022.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151230;0.200;9',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151236;2.600;9',
                    '',
                ],
                '/my/directory/MN_01_latest-2023-2024.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151230;;',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006161230;;',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006171230;;',
                    '',
                ],
            }),
            infrahorairesRepository,
            saveHistoryRepository,
            currentDate,
        });
        expect(grepperSpy.calls).toEqual([]);
        expect(await saveHistoryRepository.getLastSuccessfulIngestionDate()).toEqual(currentDate);
        assert.sameDeepMembers(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll()), [
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2000-06-15T12:30:00Z'),
                RR: null,
                QRR: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2000-06-16T12:30:00Z'),
                RR: null,
                QRR: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2000-06-17T12:30:00Z'),
                RR: null,
                QRR: null,
            },
        ]);
    });

    it('should read the relevant lines', async () => {
        const infrahorairesRepository = new InMemoryInfrahorairesRepository();
        const currentDate = new Date('2000-06-17T18:30:45Z');
        const saveHistoryRepository = new InMemorySaveHistoryRepository({
            saved: new Date('2000-06-16T18:30:45Z'),
            currentDate,
        });
        const fs = new InMemoryFileSystem();
        const grepperSpy = new GrepperSpy();
        await saveLatestInfrahorairesArchivesToDB({
            directory: '/my/directory',
            globber: createInMemoryGlobber([
                '/my/directory/MN_01_1940-1949.csv',
                '/my/directory/MN_01_previous-1950-2022.csv',
                '/my/directory/MN_01_latest-2023-2024.csv.gz',
                '/my/directory/MN_01_latest-2023-2024.csv',
            ]),
            fileExistenceChecker: fs.getFileExistenceChecker(),
            unzipper: createInMemoryUnzipper(new UnzipperSpy({ fs })),
            dateGrepper: createDayGrepper(createInMemoryGrepper(grepperSpy)),
            lineReader: createInMemoryLineReader({
                '/my/directory/MN_01_1940-1949.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151230;0.200;9',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151236;2.600;9',
                    '',
                ],
                '/my/directory/MN_01_previous-1950-2022.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151230;0.200;9',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151236;2.600;9',
                    '',
                ],
                '/my/directory/MN_01_latest-2023-2024.grepped.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006151230;;',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006161230;;',
                    ' 01014002;ARBENT;46.278167;5.669000;534;200006171230;;',
                    '',
                ],
            }),
            infrahorairesRepository,
            saveHistoryRepository,
            currentDate,
        });
        expect(grepperSpy.calls).toEqual([
            {
                patterns: ['20000616', '20000617'],
                sourceFile: '/my/directory/MN_01_latest-2023-2024.csv',
                targetFile: '/my/directory/MN_01_latest-2023-2024.grepped.csv',
            },
        ]);
        expect(await saveHistoryRepository.getLastSuccessfulIngestionDate()).toEqual(currentDate);
        assert.sameDeepMembers(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll()), [
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2000-06-15T12:30:00Z'),
                RR: null,
                QRR: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2000-06-16T12:30:00Z'),
                RR: null,
                QRR: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMMJJHHMN: new Date('2000-06-17T12:30:00Z'),
                RR: null,
                QRR: null,
            },
        ]);
    });
});
