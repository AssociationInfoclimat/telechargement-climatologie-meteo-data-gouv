import { Downloader } from '@/archives/download/Downloader.js';

export function createInMemoryDownloader(spy: DownloaderSpy): Downloader {
    return function (url, { directory }: { directory?: string }): Promise<void> {
        spy.call(url, { directory });
        return Promise.resolve();
    };
}

export class DownloaderSpy {
    calls: { url: string; directory?: string }[] = [];

    call(url: string, { directory }: { directory?: string }): void {
        this.calls.push({ url, directory });
    }
}
