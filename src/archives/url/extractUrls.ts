import { UrlsData } from '@/archives/url/UrlsData.js';

export function extractUrls(data: UrlsData): string[] {
    return data.data.filter(({ format }) => format === 'csv.gz').map(({ url }) => url);
}
