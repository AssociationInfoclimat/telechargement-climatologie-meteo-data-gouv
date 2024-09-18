import { download } from '@/archives/download/download.real.js';
import { downloadArchive } from '@/archives/use-cases/download/downloadArchive.js';
import { fileExists } from '@/lib/fs/fileExists.node.js';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';

import { beforeEach, describe, expect, it } from 'vitest';

describe('downloadArchive', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/downloads`, { recursive: true, force: true });
    });
    it('should download the archive', async () => {
        await downloadArchive({
            url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz',
            fileExists,
            download,
            directory: `${import.meta.dirname}/downloads`,
            overwrite: true,
        });
        expect(existsSync(`${import.meta.dirname}/downloads/MN_01_2000-2009.csv.gz`)).toBeTruthy();
    });
});
