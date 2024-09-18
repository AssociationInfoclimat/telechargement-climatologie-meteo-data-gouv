import { FileExistenceChecker } from '@/lib/fs/FileExistenceChecker.js';

export class InMemoryFileSystem {
    files: Set<string>;

    constructor({ files = [] }: { files?: string[] } = {}) {
        this.files = new Set(files);
    }

    fileExists(path: string): boolean {
        return this.files.has(path);
    }

    getFileExistenceChecker(): FileExistenceChecker {
        return path => this.fileExists(path);
    }

    add(path: string): void {
        this.files.add(path);
    }
}
