import { unzipArchives } from '@/archives/use-cases/unzip/unzipArchives.js';
import { InMemoryFileSystem } from '@/lib/fs/fileExists.in-memory.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { createInMemoryUnzipper, UnzipperSpy } from '@/lib/unzip/gunzip.in-memory.js';
import { describe, expect, it } from 'vitest';

describe('unzipArchives', () => {
    it('should unzip all the archives', async () => {
        const fs = new InMemoryFileSystem({ files: [] });
        const spy = new UnzipperSpy({ fs });
        await unzipArchives({
            directory: './data/',
            globber: createInMemoryGlobber([
                './data/MN_01_2000-2009.csv.gz',
                './data/H_01_1850-1859.csv.gz',
                './data/Q_01_1852-1949_autres-parametres.csv.gz',
                './data/MENSQ_01_1852-1949.csv.gz',
                './data/DECADQ_01_1852-1949.csv.gz',
                './data/DECADAGRO_01_1852-1949.csv.gz',
                './data/other.csv',
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
                gzpath: './data/H_01_1850-1859.csv.gz',
                outpath: './data/H_01_1850-1859.csv',
            },
            {
                gzpath: './data/Q_01_1852-1949_autres-parametres.csv.gz',
                outpath: './data/Q_01_1852-1949_autres-parametres.csv',
            },
            {
                gzpath: './data/MENSQ_01_1852-1949.csv.gz',
                outpath: './data/MENSQ_01_1852-1949.csv',
            },
            {
                gzpath: './data/DECADQ_01_1852-1949.csv.gz',
                outpath: './data/DECADQ_01_1852-1949.csv',
            },
            {
                gzpath: './data/DECADAGRO_01_1852-1949.csv.gz',
                outpath: './data/DECADAGRO_01_1852-1949.csv',
            },
        ]);
    });
});
