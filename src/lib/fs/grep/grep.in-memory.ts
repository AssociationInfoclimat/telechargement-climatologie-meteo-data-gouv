import { Grepper } from '@/lib/fs/grep/Grepper.js';

export class GrepperSpy {
    public calls: unknown[] = [];

    call(patterns: string[], sourceFile: string, targetFile: string): void {
        this.calls.push({ patterns, sourceFile, targetFile });
    }
}

export function createInMemoryGrepper(spy: GrepperSpy): Grepper {
    return function (patterns: string[], sourceFile: string, targetFile: string): Promise<void> {
        spy.call(patterns, sourceFile, targetFile);
        return Promise.resolve();
    };
}
