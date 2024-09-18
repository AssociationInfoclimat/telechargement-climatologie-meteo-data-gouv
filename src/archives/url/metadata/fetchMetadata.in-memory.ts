import { DatasetId } from '@/archives/url/DATASETS_IDS.js';
import { MetadataFetcher } from '@/archives/url/metadata/MetadataFetcher.js';
import { UrlsData } from '@/archives/url/UrlsData.js';

export function createInMemoryMetadataFetcher(db: Partial<Record<DatasetId, string[]>> = {}): MetadataFetcher {
    const map = new Map(Object.entries(db));
    return function (datasetId: DatasetId): Promise<UrlsData> {
        const urls = map.get(datasetId) ?? [];
        const data = urls.map(url => ({ url, format: 'csv.gz' }));
        // Random object to be ignored
        data.push({
            url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_descriptif_champs.csv',
            format: 'csv',
        });
        return Promise.resolve({ data });
    };
}
