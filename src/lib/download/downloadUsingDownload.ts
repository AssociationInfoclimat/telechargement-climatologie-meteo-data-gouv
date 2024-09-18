import { Downloader } from '@/lib/download/Downloader.js';
// import decompressUnzip from 'decompress-unzip';
// import decompressTargz from 'decompress-targz';
import download from 'download';

export const downloadUsingDownload: Downloader = async function (
    url,
    { directory }: { directory?: string }
): Promise<void> {
    if (!directory) {
        directory = process.cwd();
    }
    await download(url, directory, {
        // extract: true,
        // plugins: [decompressUnzip()],
    });
};
