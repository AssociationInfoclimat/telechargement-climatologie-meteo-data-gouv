import { createInMemoryDownloader, DownloaderSpy } from '@/archives/download/download.in-memory.js';
import { InMemoryFileSystem } from '@/lib/fs/file-exists/fileExists.in-memory.js';

import { describe, expect, it } from 'vitest';

describe('Downloader', () => {
    it('should add the file to the file system', () => {
        const fs: InMemoryFileSystem = new InMemoryFileSystem();
        const download = createInMemoryDownloader(new DownloaderSpy({ fs }));
        download(
            'https://raw.githubusercontent.com/AssociationInfoclimat/telechargement-climatologie-meteo-data-gouv/refs/heads/main/README.md',
            { directory: '/my/directory' }
        );
        expect(fs.fileExists('/my/directory/README.md')).toBeTruthy();
    });
});
