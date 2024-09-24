import { FileExistenceChecker } from '@/lib/fs/file-exists/FileExistenceChecker.js';
import { existsSync } from 'node:fs';

export const fileExists: FileExistenceChecker = function (path: string) {
    return existsSync(path);
};
