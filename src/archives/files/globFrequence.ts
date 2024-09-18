import { Frequence } from '@/archives/files/Frequence.js';
import { Globber } from '@/lib/fs/glob/Globber.js';
import { join } from 'node:path';

export function globFrequence({
    frequence,
    directory,
    glob,
}: {
    frequence: Frequence;
    directory: string;
    glob: Globber;
}): Promise<string[]> {
    return glob(join(directory, `${frequence}_*.gz`));
}
