import { Departement } from '@/archives/departements/Departement.js';
import { download } from '@/archives/download/download.real.js';
import { fetchMetadata } from '@/archives/url/metadata/fetchMetadata.meteo-data.js';
import { downloadArchives } from '@/archives/use-cases/download/downloadArchives.js';
import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
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
            fileExistenceChecker: fileExists,
            downloader: download,
            directory: `${import.meta.dirname}/downloads`,
            overwrite: true,
            page: 1,
            pageSize: 1,
            departements: [Departement.of(29)],
        });
        expect(existsSync(`${import.meta.dirname}/downloads/MN_29_2000-2009.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MN-COMP_29_2010-2019.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/H_29_1850-1859.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/H-COMP_29_2000-2009.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/Q_29_1855-1949_RR-T-Vent.csv.gz`)).toBeTruthy();
        expect(
            existsSync(`${import.meta.dirname}/downloads/Q-COMP_29_previous-1950-2023_RR-T-Vent.csv.gz`)
        ).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MENSQ_29_1855-1949.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/MENSQ-COMP_29_previous-1950-2023.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADQ_29_1855-1949.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADQ-COMP_29_previous-1950-2023.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADAGRO_29_1855-1949.csv.gz`)).toBeTruthy();
        expect(existsSync(`${import.meta.dirname}/downloads/DECADAGRO-COMP_29_latest-2024-2025.csv.gz`)).toBeTruthy();
    });
});
