import { unzipFrequenceArchives } from '@/archives/use-cases/unzip/unzipFrequenceArchives.js';
import { FREQUENCES } from '@/files/Frequence.js';
import { InMemoryFileSystem } from '@/lib/fs/file-exists/fileExists.in-memory.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { createInMemoryUnzipper, UnzipperSpy } from '@/lib/unzip/gunzip.in-memory.js';
import { describe, expect, it } from 'vitest';

describe('unzipFrequenceArchives', () => {
    it('should unzip the archives for this data frequency', async () => {
        const fs = new InMemoryFileSystem({ files: [] });
        const spy = new UnzipperSpy({ fs });
        await unzipFrequenceArchives({
            frequence: FREQUENCES.infrahoraire,
            directory: './data/',
            globber: createInMemoryGlobber([
                './data/MN_01_2000-2009.csv.gz',
                './data/MN_01_2010-2019.csv.gz',
                './data/H_01_1850-1859.csv.gz',
            ]),
            fileExistenceChecker: fs.getFileExistenceChecker(),
            unzipper: createInMemoryUnzipper(spy),
            overwrite: false,
        });
        expect(spy.calls).toEqual([
            {
                gzpath: './data/MN_01_2000-2009.csv.gz',
                outpath: './data/MN_01_2000-2009.csv',
            },
            {
                gzpath: './data/MN_01_2010-2019.csv.gz',
                outpath: './data/MN_01_2010-2019.csv',
            },
        ]);
    });
});
