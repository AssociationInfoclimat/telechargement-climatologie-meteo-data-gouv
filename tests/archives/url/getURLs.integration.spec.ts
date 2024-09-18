import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { getURLs } from '@/archives/url/getURLs.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.meteo-data.js';

import { describe, expect, it } from 'vitest';

describe('getURLs', () => {
    it('should fetch metadata and extract URLs', async () => {
        const urls = await getURLs({
            datasetId: DATASETS_IDS.infrahoraire,
            fetchMetadata,
            page: 1,
            pageSize: 2,
        });
        expect(urls).toEqual([
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2010-2019.csv.gz',
        ]);
    });
});
