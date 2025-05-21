import { Departement } from '@/archives/departements/Departement.js';
import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { extractUrls } from '@/archives/url/extractUrls.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';

export async function getURLs({
    datasetId,
    fetchMetadata,
    page = 1,
    pageSize = 999999,
    departements,
    latest = false,
}: {
    datasetId: DatasetId;
    fetchMetadata: MetadataFetcher;
    page?: number;
    pageSize?: number;
    departements?: Departement[];
    latest?: boolean;
}): Promise<string[]> {
    if (!departements || departements.length === 0) {
        const data = await fetchMetadata(datasetId, { page, pageSize, latest });
        return extractUrls(data);
    }
    const urls: string[] = [];
    for (const departement of departements) {
        const data = await fetchMetadata(datasetId, { page, pageSize, departement, latest });
        urls.push(...extractUrls(data));
    }
    return urls;
}
