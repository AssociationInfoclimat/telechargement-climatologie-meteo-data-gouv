import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.js';

import { describe, expect, it } from 'vitest';

describe('fetchMetadata', () => {
    it('should fetch URLs metadata', async () => {
        const metadata = await fetchMetadata(DATASETS_IDS.horaire, { page: 1, pageSize: 2 });
        expect(metadata).toBeDefined();
    });
});
