import { buildArchiveURLs } from '@/archives/url/buildArchiveURLs.js';

import { describe, expect, it } from 'vitest';

describe('buildArchiveURLs', () => {
    it('should include all possible combinations', () => {
        const urls = buildArchiveURLs(2024);
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2000-2009.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_29_1770-1779.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_29_latest-2023-2024.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_76_previous-1950-2022_RR-T-Vent.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_985_latest-2023-2024_autres-parametres.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MENS/MENSQ_01_previous-1950-2022.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECAD/DECADQ_29_latest-2023-2024.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECADAGRO/DECADAGRO_76_previous-1950-2022.csv.gz'
        );
    });
    it('should work for any current year', () => {
        const urls = buildArchiveURLs(2025);
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_latest-2024-2025.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_29_latest-2024-2025.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_76_previous-1950-2023_RR-T-Vent.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_985_latest-2024-2025_autres-parametres.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MENS/MENSQ_01_previous-1950-2023.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECAD/DECADQ_29_latest-2024-2025.csv.gz'
        );
        expect(urls).toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECADAGRO/DECADAGRO_76_previous-1950-2023.csv.gz'
        );
    });
    it('should not contain wrong URLs', () => {
        const urls = buildArchiveURLs(2025);
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_2024-2025.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_29_2024-2025.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_76_1950-2023_RR-T-Vent.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_985_2024-2025_autres-parametres.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MENS/MENSQ_01_1950-2023.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECAD/DECADQ_29_2024-2025.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECADAGRO/DECADAGRO_76_1950-2023.csv.gz'
        );

        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_previous-1950-2022.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MIN/MN_01_previous-1950-2023_RR-T-Vent.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_29_previous-1950-2023_autres-parametres.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/HOR/H_29_latest-2024-2025_autres-parametres.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_76_previous-1950-2023.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/QUOT/Q_985_latest-2024-2025.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/MENS/MENSQ_01_previous-1950-2023_RR-T-Vent.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECAD/DECADQ_29_latest-2024-2025_autres-parametres.csv.gz'
        );
        expect(urls).not.toContain(
            'https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/DECADAGRO/DECADAGRO_76_previous-1950-2023_RR-T-Vent.csv.gz'
        );
    });
});
