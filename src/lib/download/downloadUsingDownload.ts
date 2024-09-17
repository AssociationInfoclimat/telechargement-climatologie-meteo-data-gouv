import { Downloader } from '@/lib/download/Downloader.js';
import download from 'download';

export const downloadUsingDownload: Downloader = async function (
    url,
    { directory }: { directory?: string }
): Promise<void> {
    if (!directory) {
        directory = process.cwd();
    }
    await download(url, directory, { extract: true });
};
