import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { UrlsData } from '@/archives/url/UrlsData.js';

export function createInMemoryMetadataFetcher(db: Partial<Record<DatasetId, string[]>> = {}): MetadataFetcher {
    const map = new Map(Object.entries(db));
    return function (datasetId: DatasetId): Promise<UrlsData> {
        const urls = map.get(datasetId) ?? [];
        return Promise.resolve({ data: urls.map(url => ({ url })) });
    };
}
