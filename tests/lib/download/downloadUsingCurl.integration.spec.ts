import { downloadUsingCurl } from '@/lib/download/downloadUsingCurl.js';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { beforeEach, describe, expect, it } from 'vitest';

describe('downloadUsingCurl', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/downloads`, { recursive: true, force: true });
    });
    it('should download the file to the directory', async () => {
        await downloadUsingCurl(
            'https://raw.githubusercontent.com/AssociationInfoclimat/telechargement-climatologie-meteo-data-gouv/refs/heads/main/README.md',
            { directory: `${import.meta.dirname}/downloads` }
        );
        expect(existsSync(`${import.meta.dirname}/downloads/README.md`)).toBeTruthy();
    });
});
