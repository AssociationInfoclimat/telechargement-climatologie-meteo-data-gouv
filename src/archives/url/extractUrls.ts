import { UrlsData } from '@/archives/url/UrlsData.js';

export function extractUrls(data: UrlsData): string[] {
    return data.data.map(({ url }) => url);
}
