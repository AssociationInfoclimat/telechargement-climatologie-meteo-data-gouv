import { createInMemoryDownloader, DownloaderSpy } from '@/archives/download/download.in-memory.js';
import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { createInMemoryMetadataFetcher } from '@/archives/url/metadata/fetchMetadata.in-memory.js';
import { downloadFrequenceArchives } from '@/archives/use-cases/download/downloadFrequenceArchives.js';
import { InMemoryFileSystem } from '@/lib/fs/fileExists.in-memory.js';

import { describe, expect, it } from 'vitest';

describe('downloadFrequenceArchives', () => {
    it('should download all archives of this data frequency', async () => {
        const fs = new InMemoryFileSystem({ files: [] });
        const spy = new DownloaderSpy({ fs });
        await downloadFrequenceArchives({
            datasetId: DATASETS_IDS.infrahoraire,
            metadataFetcher: createInMemoryMetadataFetcher({
                [DATASETS_IDS.infrahoraire]: [
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2010-2019.csv.gz',
                ],
            }),
            fileExistenceChecker: fs.getFileExistenceChecker(),
            downloader: createInMemoryDownloader(spy),
            directory: '/my/directory',
            overwrite: false,
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
        ]);
    });
});
