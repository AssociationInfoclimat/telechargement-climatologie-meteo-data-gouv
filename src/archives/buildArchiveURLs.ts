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
            [
                [1950, Y - 2],
                [Y - 1, Y],
            ].forEach(([startYear, endYear]) => {
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
