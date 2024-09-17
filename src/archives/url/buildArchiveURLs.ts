import { getDepartements } from '@/archives/departements/getDepartements.js';

export function buildArchiveURLs(Y: number = new Date().getUTCFullYear()): string[] {
    const urls: string[] = [];
    const departements = getDepartements();
    [
        ['MIN', 'MN'],
        ['HOR', 'H'],
        ['QUOT', 'Q'],
        ['MENS', 'MENSQ'],
        ['DECAD', 'DECADQ'],
        ['DECADAGRO', 'DECADAGRO'],
    ].forEach(([freq1, freq2]) => {
        departements.forEach(departement => {
            let years: [string | number, number][] = [];
            switch (freq1) {
                case 'MIN':
                    years = [
                        [2000, 2009],
                        [2010, 2019],
                        ['previous-2020', Y - 2],
                        [`latest-${Y - 1}`, Y],
                    ];
                    break;
                case 'HOR':
                    for (let y = 1770; y < (Y / 10) * 10; y += 10) {
                        years.push([y, y + 9]);
                    }
                    years.push([`previous-${(Y / 10) * 10}`, Y - 2], [`latest-${Y - 1}`, Y]);
                    break;
                default:
                    years = [
                        ['previous-1950', Y - 2],
                        [`latest-${Y - 1}`, Y],
                    ];
            }
            years.forEach(([startYear, endYear]) => {
                const params = freq1 === 'QUOT' ? ['_RR-T-Vent', '_autres-parametres'] : [''];
                params.forEach(param => {
                    urls.push(
                        `https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/${freq1}/${freq2}_${departement.value()}_${startYear}-${endYear}${param}.csv.gz`
                    );
                });
            });
        });
    });
    return urls;
}
