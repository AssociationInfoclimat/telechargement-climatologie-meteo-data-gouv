import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { beforeEach, describe, expect, it } from 'vitest';

describe('readLines', () => {
    beforeEach(async () => {
        await rm(`${import.meta.dirname}/tmp`, { recursive: true, force: true });
        await mkdir(`${import.meta.dirname}/tmp`);
    });
    it('should read line by line', async () => {
        await writeFile(`${import.meta.dirname}/tmp/foo.csv`, 'foo\nbar\nbaz\n');
        const lines = readLines(`${import.meta.dirname}/tmp/foo.csv`);
        expect((await lines.next()).value).toEqual('foo');
        expect((await lines.next()).value).toEqual('bar');
        expect((await lines.next()).value).toEqual('baz');
        expect((await lines.next()).done).toEqual(true);
    });
    it('should read line by line', async () => {
        await writeFile(`${import.meta.dirname}/tmp/foo.csv`, 'foo\nbar\nbaz\n');
        const lines = readLines(`${import.meta.dirname}/tmp/foo.csv`);
        expect(await getArrayFromAsyncGenerator(lines)).toEqual(['foo', 'bar', 'baz']);
    });
});
