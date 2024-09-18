import { createInMemoryDownloader, DownloaderSpy } from '@/archives/download/download.in-memory.js';
import { downloadArchive } from '@/archives/use-cases/downloadArchive.js';

import { describe, expect, it } from 'vitest';

describe('downloadArchive', () => {
    it('should download the archive', async () => {
        const spy = new DownloaderSpy();
        await downloadArchive({
            url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
            download: createInMemoryDownloader(spy),
            directory: '/my/directory',
        });
        expect(spy.calls).toEqual([
            {
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                directory: '/my/directory',
            },
        ]);
    });
});
