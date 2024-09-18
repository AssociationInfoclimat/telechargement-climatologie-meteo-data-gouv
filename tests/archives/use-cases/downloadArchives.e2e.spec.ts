import { download } from '@/archives/download/download.real.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.meteo-data.js';
import { downloadArchives } from '@/archives/use-cases/downloadArchives.js';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';

import { beforeEach, describe, expect, it } from 'vitest';

describe('downloadArchives', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/downloads`, { recursive: true, force: true });
    });
    it('should download all archives', async () => {
        await downloadArchives({
            metadataFetcher: fetchMetadata,
            downloader: download,
            directory: `${import.meta.dirname}/downloads`,
            page: 1,
            pageSize: 2,
        });
        expect(existsSync(`${import.meta.dirname}/downloads/MN_01_2000-2009.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MN_01_2010-2019.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/H_01_1850-1859.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/H_01_1890-1899.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/Q_01_1852-1949_RR-T-Vent.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/Q_01_1852-1949_autres-parametres.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MENSQ_01_1852-1949.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MENSQ_01_previous-1950-2022.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADQ_01_1852-1949.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADQ_01_previous-1950-2022.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADAGRO_01_1852-1949.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADAGRO_01_previous-1950-2022.csv.gz`)).toBeTruthy();
    });
});
