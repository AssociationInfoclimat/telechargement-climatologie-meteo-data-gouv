import { Downloader } from '@/lib/download/Downloader.js';
import { execute } from '@/lib/execute.js';

export const downloadUsingCurl: Downloader = async function (
    url: string,
    { directory }: { directory?: string }
): Promise<void> {
    if (!directory) {
        directory = process.cwd();
    }
    const filename = url.split('/').pop();
    await execute('curl', [url, '-o', `${directory}/${filename}`]);
};
