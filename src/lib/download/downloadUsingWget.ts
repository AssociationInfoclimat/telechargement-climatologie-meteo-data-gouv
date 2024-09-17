import { Downloader } from '@/lib/download/Downloader.js';
import { execute } from '@/lib/execute.js';

export const downloadUsingWget: Downloader = async function (
    url: string,
    { directory }: { directory?: string }
): Promise<void> {
    if (!directory) {
        directory = process.cwd();
    }
    await execute('wget', ['-P', directory, url]);
};
