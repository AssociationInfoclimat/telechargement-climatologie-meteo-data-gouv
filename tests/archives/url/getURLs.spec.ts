import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { getURLs } from '@/archives/url/getURLs.js';
import { createInMemoryMetadataFetcher } from '@/archives/url/metadata/fetchMetadata.in-memory.js';

import { describe, expect, it } from 'vitest';

describe('getURLs', () => {
    it('should fetch metadata and extract URLs', async () => {
        const urls = await getURLs({
            datasetId: DATASETS_IDS.infrahoraire,
            fetchMetadata: createInMemoryMetadataFetcher({
                [DATASETS_IDS.infrahoraire]: [
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
                    'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2010-2019.csv.gz',
                ],
            }),
        });
        expect(urls).toEqual([
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2010-2019.csv.gz',
        ]);
    });
});
