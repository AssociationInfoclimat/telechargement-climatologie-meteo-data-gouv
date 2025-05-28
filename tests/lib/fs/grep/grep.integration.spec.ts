import { grep } from '@/lib/fs/grep/grep.exec.js';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { assert, beforeEach, describe, it } from 'vitest';

describe('grep', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/tmp`, { recursive: true, force: true });
        await mkdir(`${import.meta.dirname}/tmp`);
    });
    it('should grep a single pattern', async () => {
        await writeFile(`${import.meta.dirname}/tmp/foo.md`, 'header\nline1\nline10\nline2\nline3\n');
        await grep(['1'], `${import.meta.dirname}/tmp/foo.md`, `${import.meta.dirname}/tmp/foo.grepped.md`);
        const grepped = await readFile(`${import.meta.dirname}/tmp/foo.grepped.md`, 'utf-8');
        assert.equal(grepped, 'header\nline1\nline10\n');
    });
    it('should grep multiple patterns', async () => {
        await writeFile(`${import.meta.dirname}/tmp/foo.md`, 'header\nline1\nline10\nline2\nline3\n');
        await grep(['1', '2'], `${import.meta.dirname}/tmp/foo.md`, `${import.meta.dirname}/tmp/foo.grepped.md`);
        const grepped = await readFile(`${import.meta.dirname}/tmp/foo.grepped.md`, 'utf-8');
        assert.equal(grepped, 'header\nline1\nline10\nline2\n');
    });
});
