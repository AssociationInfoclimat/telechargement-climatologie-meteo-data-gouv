import { createInMemoryLineReader } from '@/lib/fs/read-lines/readLines.in-memory.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { describe, expect, it } from 'vitest';

describe('LineReader', () => {
    it('should read line by line', async () => {
        const lineReader = createInMemoryLineReader({
            'foo.csv': ['foo', 'bar', 'baz'],
            'bar.csv': ['qux', 'quux', 'quuz'],
        });
        const lines = lineReader('foo.csv');
        expect(await getArrayFromAsyncGenerator(lines)).toEqual(['foo', 'bar', 'baz']);
    });
});
