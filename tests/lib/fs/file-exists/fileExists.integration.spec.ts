import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
import { mkdir, rm, writeFile } from 'node:fs/promises';

import { beforeEach, describe, expect, it } from 'vitest';

describe('fileExists', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/tmp`, { recursive: true, force: true });
        await mkdir(`${import.meta.dirname}/tmp`);
    });
    it('should work', async () => {
        expect(fileExists(`${import.meta.dirname}/tmp/file.md`)).toEqual(false);
        await writeFile(`${import.meta.dirname}/tmp/file.md`, '#fileExists');
        expect(fileExists(`${import.meta.dirname}/tmp/file.md`)).toEqual(true);
    });
});
