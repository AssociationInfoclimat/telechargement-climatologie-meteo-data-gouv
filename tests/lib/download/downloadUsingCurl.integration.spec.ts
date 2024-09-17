import { downloadUsingCurl } from '@/lib/download/downloadUsingCurl.js';
import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { beforeEach, describe, expect, it } from 'vitest';

describe('downloadUsingCurl', () => {
    beforeEach(async () => {
        try {
            await unlink(`${import.meta.dirname}/tsconfig.json`);
        } catch {
            //
        }
    });
    it('should download the file to the directory', async () => {
        await downloadUsingCurl(
            'https://raw.githubusercontent.com/AssociationInfoclimat/telechargement-climatologie-portail-api-meteofrance/main/tsconfig.json',
            { directory: import.meta.dirname }
        );
        const path = `${import.meta.dirname}/tsconfig.json`;
        expect(existsSync(path)).toBeTruthy();
    });
});
