import { createInMemoryDownloader, DownloaderSpy } from '@/archives/download/download.in-memory.js';
import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { createInMemoryMetadataFetcher } from '@/archives/url/metadata/fetchMetadata.in-memory.js';
import { downloadArchives } from '@/archives/use-cases/downloadArchives.js';

import { describe, expect, it } from 'vitest';

describe('downloadArchives', () => {
    it('should download all archives', async () => {
        const spy = new DownloaderSpy();
        await downloadArchives({
            metadataFetcher: createInMemoryMetadataFetcher({
                [DATASETS_IDS.infrahoraire]: [
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2010-2019.csv.gz',
                ],
                [DATASETS_IDS.horaire]: [
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1850-1859.csv.gz',
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1890-1899.csv.gz',
                ],
            }),
            downloader: createInMemoryDownloader(spy),
            directory: '/my/directory',
        });
        expect(spy.calls).toEqual([
            {
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                directory: '/my/directory',
            },
            {
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2010-2019.csv.gz',
                directory: '/my/directory',
            },
            {
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1850-1859.csv.gz',
                directory: '/my/directory',
            },
            {
                url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1890-1899.csv.gz',
                directory: '/my/directory',
            },
        ]);
    });
});
