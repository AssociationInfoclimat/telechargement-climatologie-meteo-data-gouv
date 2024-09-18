import { Downloader } from '@/archives/download/Downloader.js';
import { InMemoryFileSystem } from '@/lib/fs/fileExists.in-memory.js';

export function createInMemoryDownloader(spy: DownloaderSpy): Downloader {
    return function (url, { directory }: { directory?: string }): Promise<void> {
        spy.call(url, { directory });
        return Promise.resolve();
    };
}

export class DownloaderSpy {
    calls: { url: string; directory?: string }[] = [];
    private readonly fs: InMemoryFileSystem;

    constructor({ fs = new InMemoryFileSystem() }: { fs?: InMemoryFileSystem } = {}) {
        this.fs = fs;
    }

    call(url: string, { directory }: { directory?: string }): void {
        const filename = url.split('/').pop();
        const filepath = `${directory}/${filename}`;
        this.fs.add(filepath);
        this.calls.push({ url, directory });
    }
}
