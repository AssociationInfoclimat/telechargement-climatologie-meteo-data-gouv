import { Departement } from '@/archives/departements/Departement.js';
import { download } from '@/archives/download/download.real.js';
import { DATASETS_IDS } from '@/archives/url/DATASETS_IDS.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.meteo-data.js';
import { downloadFrequenceArchives } from '@/archives/use-cases/download/downloadFrequenceArchives.js';
import { fileExists } from '@/lib/fs/fileExists.node.js';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';

import { beforeEach, describe, expect, it } from 'vitest';

describe('downloadFrequenceArchives', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/downloads`, { recursive: true, force: true });
    });
    it('should download all archives of this data frequency', async () => {
        await downloadFrequenceArchives({
            datasetId: DATASETS_IDS.infrahoraire,
            metadataFetcher: fetchMetadata,
            fileExistenceChecker: fileExists,
            downloader: download,
            directory: `${import.meta.dirname}/downloads`,
            overwrite: true,
            page: 1,
            pageSize: 2,
            departement: Departement.of(1),
        });
        expect(existsSync(`${import.meta.dirname}/downloads/MN_01_2000-2009.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MN_01_2010-2019.csv.gz`)).toBeTruthy();
    });
});
