import { Globber } from '@/lib/fs/glob/Globber.js';

export function createInMemoryGlobber(files: string[] = []): Globber {
    return function (pattern: string): Promise<string[]> {
        pattern = `${pattern.replaceAll('*', '.*')}$`; // glob pattern to regex pattern
        return Promise.resolve(files.filter(file => file.match(pattern)));
    };
}
