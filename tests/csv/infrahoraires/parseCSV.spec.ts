import { InfrahoraireLine, parseCSV } from '@/csv/infrahoraires/parseCSV.js';
import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { PositiveNumber } from '@/data/value-objects/PositiveNumber.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';
import { describe, expect, it } from 'vitest';

export function* arrayGenerator<T>(array: T[]): Generator<T> {
    for (const item of array) {
        yield item;
    }
}

describe('parseCSV', () => {
    describe('parseCSV', () => {
        it('should parse the CSV', () => {
            const csvLines = arrayGenerator([
                'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJHHMN;RR;QRR',
                ' 01014002;ARBENT;46.278167;5.669000;534;200507010000;0.200;9',
                ' 01014002;ARBENT;46.278167;5.669000;534;200507010006;2.600;9',
                ' 01014002;ARBENT;46.278167;5.669000;534;200507010012;;',
                '',
            ]);
            const infrahoraireLines = Array.from(parseCSV(csvLines));
            expect(infrahoraireLines).toEqual<InfrahoraireLine[]>([
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMMJJHHMN: new Date('2005-07-01T00:00:00Z'),
                    RR: PositiveNumber.of(0.2),
                    QRR: CodeQualite.of(9),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMMJJHHMN: new Date('2005-07-01T00:06:00Z'),
                    RR: PositiveNumber.of(2.6),
                    QRR: CodeQualite.of(9),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMMJJHHMN: new Date('2005-07-01T00:12:00Z'),
                    RR: PositiveNumber.of(null),
                    QRR: CodeQualite.of(null),
                },
            ]);
        });
    });
});
