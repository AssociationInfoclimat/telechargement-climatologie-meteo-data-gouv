import { LineReader } from '@/lib/fs/read-lines/LineReader.js';

export function createInMemoryLineReader(db: Record<string, string[]> = {}): LineReader {
    return async function* (path: string) {
        const lines = db[path];
        if (!lines) {
            throw new Error(`File not found: '${path}'`);
        }
        for (const line of lines) {
            yield line;
        }
    };
}
