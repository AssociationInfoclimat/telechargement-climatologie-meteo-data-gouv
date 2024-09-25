import { glob } from '@/lib/fs/glob/glob.glob.js';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { assert, beforeEach, describe, it } from 'vitest';

describe('glob', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/tmp`, { recursive: true, force: true });
        await mkdir(`${import.meta.dirname}/tmp`);
    });
    it('should glob', async () => {
        await writeFile(`${import.meta.dirname}/tmp/foo.md`, '#Foo');
        await writeFile(`${import.meta.dirname}/tmp/foo.txt`, 'Foo');
        await writeFile(`${import.meta.dirname}/tmp/bar.md`, '#Bar');
        await writeFile(`${import.meta.dirname}/tmp/bar.txt`, 'Bar');
        assert.sameMembers(await glob(`${import.meta.dirname}/tmp/*.md`), [
            `${import.meta.dirname}/tmp/foo.md`,
            `${import.meta.dirname}/tmp/bar.md`,
        ]);
        assert.sameMembers(await glob(`${import.meta.dirname}/tmp/*.txt`), [
            `${import.meta.dirname}/tmp/foo.txt`,
            `${import.meta.dirname}/tmp/bar.txt`,
        ]);
        assert.sameMembers(await glob(`${import.meta.dirname}/tmp/foo.*`), [
            `${import.meta.dirname}/tmp/foo.md`,
            `${import.meta.dirname}/tmp/foo.txt`,
        ]);
        assert.sameMembers(await glob(`${import.meta.dirname}/tmp/bar.*`), [
            `${import.meta.dirname}/tmp/bar.md`,
            `${import.meta.dirname}/tmp/bar.txt`,
        ]);
        assert.sameMembers(await glob(`${import.meta.dirname}/tmp/*`), [
            `${import.meta.dirname}/tmp/foo.md`,
            `${import.meta.dirname}/tmp/foo.txt`,
            `${import.meta.dirname}/tmp/bar.md`,
            `${import.meta.dirname}/tmp/bar.txt`,
        ]);
    });
});
