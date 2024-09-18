import { Unzipper } from '@/lib/unzip/Unzipper.js';

export class UnzipperSpy {
    calls: { gzpath: string; outpath: string }[] = [];

    call(gzpath: string, outpath: string): void {
        this.calls.push({ gzpath, outpath });
    }
}

export function createInMemoryUnzipper(spy: UnzipperSpy): Unzipper {
    return function (gzpath: string, outpath: string): Promise<void> {
        spy.call(gzpath, outpath);
        return Promise.resolve();
    };
}
