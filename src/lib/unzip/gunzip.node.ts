import { Unzipper } from '@/lib/unzip/Unzipper.js';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { createGunzip } from 'node:zlib';

const pipe = promisify(pipeline);

export const gunzip: Unzipper = async function (gzpath: string, outpath: string): Promise<void> {
    const gunzip = createGunzip();
    const source = createReadStream(gzpath);
    const destination = createWriteStream(outpath);
    await pipe(source, gunzip, destination);
};
