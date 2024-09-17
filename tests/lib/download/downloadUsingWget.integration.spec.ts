import { downloadUsingWget } from '@/lib/download/downloadUsingWget.js';
import { existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { beforeEach, describe, expect, it } from 'vitest';

describe('downloadUsingWget', () => {
    beforeEach(async () => {
        try {
            await unlink(`${import.meta.dirname}/tsconfig.json`);
        } catch {
            //
        }
    });
    it('should download the file to the directory', async () => {
        await downloadUsingWget(
            'https://raw.githubusercontent.com/AssociationInfoclimat/telechargement-climatologie-portail-api-meteofrance/main/tsconfig.json',
            { directory: import.meta.dirname }
        );
        const path = `${import.meta.dirname}/tsconfig.json`;
        expect(existsSync(path)).toBeTruthy();
    });
});
