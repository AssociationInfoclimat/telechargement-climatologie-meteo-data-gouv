import { Departement } from '@/archives/departements/Departement.js';
import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { extractUrls } from '@/archives/url/extractUrls.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';

export async function getURLs({
    datasetId,
    fetchMetadata,
    page = 1,
    pageSize = 999999,
    departement,
}: {
    datasetId: DatasetId;
    fetchMetadata: MetadataFetcher;
    page?: number;
    pageSize?: number;
    departement?: Departement;
}): Promise<string[]> {
    const data = await fetchMetadata(datasetId, { page, pageSize, departement });
    return extractUrls(data);
}
