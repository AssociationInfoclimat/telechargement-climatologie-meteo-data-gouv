import { InMemoryFileSystem } from '@/lib/fs/fileExists.in-memory.js';
import { Unzipper } from '@/lib/unzip/Unzipper.js';

export class UnzipperSpy {
    calls: { gzpath: string; outpath: string }[] = [];
    private readonly fs: InMemoryFileSystem;

    constructor({ fs = new InMemoryFileSystem() }: { fs?: InMemoryFileSystem } = {}) {
        this.fs = fs;
    }

    call(gzpath: string, outpath: string): void {
        this.fs.add(outpath);
        this.calls.push({ gzpath, outpath });
    }
}

export function createInMemoryUnzipper(spy: UnzipperSpy): Unzipper {
    return function (gzpath: string, outpath: string): Promise<void> {
        spy.call(gzpath, outpath);
        return Promise.resolve();
    };
}
