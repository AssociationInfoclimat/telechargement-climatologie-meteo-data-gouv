import { Downloader } from '@/archives/download/Downloader.js';
import { download as realDownloader } from '@/lib/download/download.js';

export const download: Downloader = realDownloader;
