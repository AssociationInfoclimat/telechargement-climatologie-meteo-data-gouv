import { InMemoryFileSystem } from '@/lib/fs/file-exists/fileExists.in-memory.js';

import { describe, expect, it } from 'vitest';

describe('InMemoryFileSystem', () => {
    describe('fileExists', () => {
        it('should work', () => {
            const fs = new InMemoryFileSystem({ files: [] });
            const fileExistenceChecker = fs.getFileExistenceChecker();
            expect(fs.fileExists('foo')).toEqual(false);
            expect(fileExistenceChecker('foo')).toEqual(false);
            fs.add('foo');
            expect(fs.fileExists('foo')).toEqual(true);
            expect(fileExistenceChecker('foo')).toEqual(true);
        });
    });
});
