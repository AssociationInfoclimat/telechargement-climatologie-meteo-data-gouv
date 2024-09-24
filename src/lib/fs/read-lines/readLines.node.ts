import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { open } from 'node:fs/promises';

export const readLines: LineReader = async function* (path: string) {
    const file = await open(path);
    const lines = file.readLines({ encoding: 'utf-8' });
    for await (const line of lines) {
        yield line;
    }
};
