import { Departement } from '@/archives/departements/Departement.js';
import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { UrlsData } from '@/archives/url/UrlsData.js';

export type MetadataFetcher = (
    datasetId: DatasetId,
    options?: {
        page?: number;
        pageSize?: number;
        departement?: Departement;
    }
) => Promise<UrlsData>;
