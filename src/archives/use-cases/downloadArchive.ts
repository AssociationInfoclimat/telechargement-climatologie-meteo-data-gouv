import { Downloader } from '@/archives/download/Downloader.js';

export async function downloadArchive({
    url,
    download,
    directory,
}: {
    url: string;
    download: Downloader;
    directory?: string;
}): Promise<void> {
    if (!directory) {
        directory = `${process.cwd()}/data`;
    }
    await download(url, { directory });
}
