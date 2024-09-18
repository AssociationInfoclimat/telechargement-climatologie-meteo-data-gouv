import { extractUrls } from '@/archives/url/extractUrls.js';
import { UrlsData } from '@/archives/url/UrlsData.js';
import { describe, expect, it } from 'vitest';

describe('extractUrls', () => {
    it('should extract the URLs', () => {
        const data: UrlsData = {
            data: [
                {
                    id: '6167025b-323d-4325-8e11-ea7cffaa8ce8',
                    title: 'HOR_departement_01_periode_1850-1859',
                    description: 'Données horaires pour le département 01, sur la période 1850-1859',
                    filetype: 'remote',
                    type: 'main',
                    format: 'csv.gz',
                    url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1850-1859.csv.gz',
                    latest: 'https://www.data.gouv.fr/fr/datasets/r/6167025b-323d-4325-8e11-ea7cffaa8ce8',
                    checksum: null,
                    filesize: 9428,
                    mime: null,
                    created_at: '2023-12-12T14:37:42.663000+00:00',
                    last_modified: '2024-03-26T05:51:50+00:00',
                    metrics: {
                        views: 1370,
                    },
                    harvest: null,
                    extras: {
                        'check:available': true,
                        'check:status': 200,
                        'check:timeout': false,
                        'check:date': '2023-12-12T15:19:07.404000',
                        'check:headers:content-type': 'application/octet-stream',
                        'check:headers:content-length': 9428,
                        'analysis:content-length': 320889,
                        'analysis:checksum': '27bd12322a3c13967c82c052e64578ef42e7d4ef',
                        'analysis:mime-type': 'text/plain',
                        'analysis:last-modified-at': '2024-03-26T05:51:50+00:00',
                        'analysis:last-modified-detection': 'last-modified-header',
                        'analysis:parsing:finished_at': '2024-03-28T04:14:08.562122+00:00',
                        'analysis:parsing:started_at': '2024-03-28T04:14:02.011535+00:00',
                    },
                    preview_url: 'https://explore.data.gouv.fr/fr/resources/6167025b-323d-4325-8e11-ea7cffaa8ce8',
                    schema: {
                        name: null,
                        version: null,
                        url: null,
                    },
                    internal: {
                        created_at_internal: '2023-12-12T14:37:42.663000+00:00',
                        last_modified_internal: '2024-01-10T09:17:20.992000+00:00',
                    },
                },
                {
                    id: 'c66dc0d5-b4ac-4801-9115-5f7f95785d79',
                    title: 'HOR_departement_01_periode_1890-1899',
                    description: 'Données horaires pour le département 01, sur la période 1890-1899',
                    filetype: 'remote',
                    type: 'main',
                    format: 'csv.gz',
                    url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1890-1899.csv.gz',
                    latest: 'https://www.data.gouv.fr/fr/datasets/r/c66dc0d5-b4ac-4801-9115-5f7f95785d79',
                    checksum: null,
                    filesize: 42598,
                    mime: null,
                    created_at: '2023-12-12T14:37:41.550000+00:00',
                    last_modified: '2024-03-26T05:51:50+00:00',
                    metrics: {
                        views: 396,
                    },
                    harvest: null,
                    extras: {
                        'check:available': true,
                        'check:status': 200,
                        'check:timeout': false,
                        'check:date': '2023-12-12T15:55:26.550000',
                        'check:headers:content-type': 'application/octet-stream',
                        'check:headers:content-length': 42598,
                        'analysis:content-length': 983424,
                        'analysis:checksum': '8e3691c61cba9a91d3014c36996b4bab938719ee',
                        'analysis:mime-type': 'text/plain',
                        'analysis:last-modified-at': '2024-03-26T05:51:50+00:00',
                        'analysis:last-modified-detection': 'last-modified-header',
                        'analysis:parsing:finished_at': '2024-03-30T04:08:13.243865+00:00',
                        'analysis:parsing:started_at': '2024-03-30T04:08:03.273741+00:00',
                    },
                    preview_url: 'https://explore.data.gouv.fr/fr/resources/c66dc0d5-b4ac-4801-9115-5f7f95785d79',
                    schema: {
                        name: null,
                        version: null,
                        url: null,
                    },
                    internal: {
                        created_at_internal: '2023-12-12T14:37:41.550000+00:00',
                        last_modified_internal: '2024-01-10T09:17:22.469000+00:00',
                    },
                },

                {
                    id: '5d0f9af9-149b-463a-9472-445dafb698d9',
                    title: 'H_descriptif_champs.csv',
                    description: null,
                    filetype: 'remote',
                    type: 'documentation',
                    format: 'csv',
                    url: 'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_descriptif_champs.csv',
                    latest: 'https://www.data.gouv.fr/fr/datasets/r/5d0f9af9-149b-463a-9472-445dafb698d9',
                    checksum: null,
                    filesize: 10115,
                    mime: null,
                    created_at: '2023-12-12T14:20:48.207000+00:00',
                    last_modified: '2024-03-26T05:53:32+00:00',
                    metrics: {
                        views: 6282,
                    },
                    harvest: null,
                    extras: {
                        'check:available': true,
                        'check:status': 200,
                        'check:timeout': false,
                        'check:date': '2023-12-12T15:12:36.449129+00:00',
                        'check:headers:content-type': 'application/octet-stream',
                        'check:headers:content-length': 10115,
                        'analysis:content-length': 10115,
                        'analysis:checksum': '562a6c2ecf307ad0526bba6904face256db2a9e8',
                        'analysis:mime-type': 'text/plain',
                        'analysis:last-modified-at': '2024-03-26T05:53:32+00:00',
                        'analysis:last-modified-detection': 'last-modified-header',
                    },
                    preview_url: null,
                    schema: {
                        name: null,
                        version: null,
                        url: null,
                    },
                    internal: {
                        created_at_internal: '2023-12-12T14:20:48.207000+00:00',
                        last_modified_internal: '2023-12-12T14:20:48.207000+00:00',
                    },
                },
            ],
            next_page: 'https://www.data.gouv.fr/api/2/datasets/6569b4473bedf2e7abad3b72/resources/?page=2&page_size=2',
            previous_page: null,
            page: 1,
            page_size: 2,
            total: 1448,
        };
        const urls = extractUrls(data);
        expect(urls).toEqual([
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1850-1859.csv.gz',
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_01_1890-1899.csv.gz',
        ]);
    });
});
