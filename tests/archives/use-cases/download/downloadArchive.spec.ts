import { createInMemoryDownloader, DownloaderSpy } from '@/archives/download/download.in-memory.js';
import { downloadArchive } from '@/archives/use-cases/download/downloadArchive.js';
import { InMemoryFileSystem } from '@/lib/fs/file-exists/fileExists.in-memory.js';

import { describe, expect, it } from 'vitest';

describe('downloadArchive', () => {
    describe('when not overwriting', () => {
        it('should download the archive only once', async () => {
            const fs = new InMemoryFileSystem({ files: [] });
            const spy = new DownloaderSpy({ fs });
            await downloadArchive({
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                fileExists: fs.getFileExistenceChecker(),
                download: createInMemoryDownloader(spy),
                directory: '/my/directory',
                overwrite: false,
            });
            await downloadArchive({
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                fileExists: fs.getFileExistenceChecker(),
                download: createInMemoryDownloader(spy),
                directory: '/my/directory',
                overwrite: false,
            });
            expect(spy.calls).toEqual([
                {
                    url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                    directory: '/my/directory',
                },
            ]);
        });
    });
    describe('when overwriting', () => {
        it('should download the archive twice', async () => {
            const fs = new InMemoryFileSystem({ files: [] });
            const spy = new DownloaderSpy({ fs });
            await downloadArchive({
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                fileExists: fs.getFileExistenceChecker(),
                download: createInMemoryDownloader(spy),
                directory: '/my/directory',
                overwrite: true,
            });
            await downloadArchive({
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                fileExists: fs.getFileExistenceChecker(),
                download: createInMemoryDownloader(spy),
                directory: '/my/directory',
                overwrite: true,
            });
            expect(spy.calls).toEqual([
                {
                    url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                    directory: '/my/directory',
                },
                {
                    url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                    directory: '/my/directory',
                },
            ]);
        });
    });
});
