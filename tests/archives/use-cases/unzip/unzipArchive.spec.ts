import { unzipArchive } from '@/archives/use-cases/unzip/unzipArchive.js';
import { InMemoryFileSystem } from '@/lib/fs/file-exists/fileExists.in-memory.js';
import { createInMemoryUnzipper, UnzipperSpy } from '@/lib/unzip/gunzip.in-memory.js';
import { describe, expect, it } from 'vitest';

describe('unzipArchive', () => {
    describe('when not overwriting', () => {
        it('should unzip the archive only once', async () => {
            const fs = new InMemoryFileSystem({ files: [] });
            const spy = new UnzipperSpy({ fs });
            await unzipArchive({
                gzpath: './data/MN_01_2000-2009.csv.gz',
                gunzip: createInMemoryUnzipper(spy),
                fileExists: fs.getFileExistenceChecker(),
                overwrite: false,
            });
            await unzipArchive({
                gzpath: './data/MN_01_2000-2009.csv.gz',
                gunzip: createInMemoryUnzipper(spy),
                fileExists: fs.getFileExistenceChecker(),
                overwrite: false,
            });
            expect(spy.calls).toEqual([
                {
                    gzpath: './data/MN_01_2000-2009.csv.gz',
                    outpath: './data/MN_01_2000-2009.csv',
                },
            ]);
        });
    });
    describe('when overwriting', () => {
        it('should unzip the archive twice', async () => {
            const fs = new InMemoryFileSystem({ files: [] });
            const spy = new UnzipperSpy({ fs });
            await unzipArchive({
                gzpath: './data/MN_01_2000-2009.csv.gz',
                gunzip: createInMemoryUnzipper(spy),
                fileExists: fs.getFileExistenceChecker(),
                overwrite: true,
            });
            await unzipArchive({
                gzpath: './data/MN_01_2000-2009.csv.gz',
                gunzip: createInMemoryUnzipper(spy),
                fileExists: fs.getFileExistenceChecker(),
                overwrite: true,
            });
            expect(spy.calls).toEqual([
                {
                    gzpath: './data/MN_01_2000-2009.csv.gz',
                    outpath: './data/MN_01_2000-2009.csv',
                },
                {
                    gzpath: './data/MN_01_2000-2009.csv.gz',
                    outpath: './data/MN_01_2000-2009.csv',
                },
            ]);
        });
    });
});
