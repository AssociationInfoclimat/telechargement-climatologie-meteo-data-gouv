import { Departement } from '@/archives/departements/Departement.js';
import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { UrlsData } from '@/archives/url/UrlsData.js';
import { z } from 'zod';

export const fetchMetadata: MetadataFetcher = async function (
    datasetId: DatasetId,
    {
        page = 1,
        pageSize = 999999,
        departement,
    }: {
        page?: number;
        pageSize?: number;
        departement?: Departement;
    } = {}
): Promise<UrlsData> {
    const q = departement ? `&q=departement_${departement.value()}` : '';
    const response = await fetch(
        `https://www.data.gouv.fr/api/2/datasets/${datasetId}/resources/?page=${page}&page_size=${pageSize}${q}`
    );
    const json = await response.json();
    const schema = z.object({
        data: z.array(
            z.object({
                format: z.string(),
                url: z.string(),
            })
        ),
    });
    return schema.parse(json);
};
