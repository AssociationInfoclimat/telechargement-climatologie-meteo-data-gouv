import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { UrlsData } from '@/archives/url/UrlsData.js';
import { z } from 'zod';

export async function fetchMetadata(
    datasetId: DatasetId,
    { pageSize = 999999, page = 1 }: { pageSize?: number; page?: number } = {}
): Promise<UrlsData> {
    const response = await fetch(
        `https://www.data.gouv.fr/api/2/datasets/${datasetId}/resources/?page=${page}&page_size=${pageSize}`
    );
    const json = await response.json();
    const schema = z.object({
        data: z.array(
            z.object({
                url: z.string(),
            })
        ),
    });
    return schema.parse(json);
}
