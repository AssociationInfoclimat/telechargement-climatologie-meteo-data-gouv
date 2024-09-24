import { Globber } from '@/lib/fs/glob/Globber.js';
import { describe, expect, it } from 'vitest';

export function createInMemoryGlobber(files: string[] = []): Globber {
    return function (pattern: string): Promise<string[]> {
        pattern = pattern.replaceAll('*', '.*');
        return Promise.resolve(files.filter(file => file.match(pattern)));
    };
}

describe('Globber', () => {
    it('should return the matching files', async () => {
        const globber = createInMemoryGlobber(['foo.md', 'foo.txt', 'bar.md', 'bar.txt']);
        expect(await globber('*.md')).toEqual(['foo.md', 'bar.md']);
        expect(await globber('*.txt')).toEqual(['foo.txt', 'bar.txt']);
        expect(await globber('foo.*')).toEqual(['foo.md', 'foo.txt']);
        expect(await globber('bar.*')).toEqual(['bar.md', 'bar.txt']);
        expect(await globber('*')).toEqual(['foo.md', 'foo.txt', 'bar.md', 'bar.txt']);
    });
});
