import { DecadaireAgroLine, parseCSV } from '@/csv/decadaires-agro/parseCSV.js';
import { AngstromCodeCalcul, CodeCalcul } from '@/csv/decadaires-agro/value-objects/CodeCalcul.js';
import { Decade } from '@/data/value-objects/Decade.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { getArrayFromAsyncGenerator, getAsyncGeneratorFromArray } from '@/lib/generator/generatorUtils.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';
import { describe, expect, it } from 'vitest';

describe('parseCSV', () => {
    describe('parseCSV', () => {
        it('should parse the CSV', async () => {
            const csvLines = getAsyncGeneratorFromArray([
                'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;NUM_DECADE;RR;CRR;TN;CTN;TX;CTX;FFM;CFFM;TSVM;CTSVM;INST;CINST;GLOT;CGLOT;ETP',
                '01014002;ARBENT;46.278167;5.669000;534;202301;1;60.8;0;5.3;0;10.8;0;2.3;0;8.7;0;;;;;',
                '01014002;ARBENT;46.278167;5.669000;534;202301;2;51.2;0;-1.8;0;6.7;0;1.9;0;6.4;0;;;;;',
                '01014002;ARBENT;46.278167;5.669000;534;202301;3;1.1;0;-3.3;0;-3.3;0;1.1;0;1.1;0;4;2;4;2;1.1',
                '01014002;ARBENT;46.278167;5.669000;534;202302;1;;;;;;;;;;;;;;;',
                '',
            ]);
            const decadairesAgroLines = await getArrayFromAsyncGenerator(parseCSV(csvLines));
            expect(decadairesAgroLines).toEqual<DecadaireAgroLine[]>([
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMM: new Date('2023-01-01T00:00:00Z'),
                    NUM_DECADE: Decade.of(PositiveInteger.of(1)),
                    RR: PositiveFloat.of(60.8),
                    CRR: CodeCalcul.of(PositiveInteger.of(0)),
                    TN: 5.3,
                    CTN: CodeCalcul.of(PositiveInteger.of(0)),
                    TX: 10.8,
                    CTX: CodeCalcul.of(PositiveInteger.of(0)),
                    FFM: PositiveFloat.of(2.3),
                    CFFM: CodeCalcul.of(PositiveInteger.of(0)),
                    TSVM: PositiveFloat.of(8.7),
                    CTSVM: CodeCalcul.of(PositiveInteger.of(0)),
                    INST: PositiveInteger.of(null),
                    CINST: AngstromCodeCalcul.of(PositiveInteger.of(null)),
                    GLOT: PositiveInteger.of(null),
                    CGLOT: AngstromCodeCalcul.of(PositiveInteger.of(null)),
                    ETP: PositiveFloat.of(null),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMM: new Date('2023-01-01T00:00:00Z'),
                    NUM_DECADE: Decade.of(PositiveInteger.of(2)),
                    RR: PositiveFloat.of(51.2),
                    CRR: CodeCalcul.of(PositiveInteger.of(0)),
                    TN: -1.8,
                    CTN: CodeCalcul.of(PositiveInteger.of(0)),
                    TX: 6.7,
                    CTX: CodeCalcul.of(PositiveInteger.of(0)),
                    FFM: PositiveFloat.of(1.9),
                    CFFM: CodeCalcul.of(PositiveInteger.of(0)),
                    TSVM: PositiveFloat.of(6.4),
                    CTSVM: CodeCalcul.of(PositiveInteger.of(0)),
                    INST: PositiveInteger.of(null),
                    CINST: AngstromCodeCalcul.of(PositiveInteger.of(null)),
                    GLOT: PositiveInteger.of(null),
                    CGLOT: AngstromCodeCalcul.of(PositiveInteger.of(null)),
                    ETP: PositiveFloat.of(null),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMM: new Date('2023-01-01T00:00:00Z'),
                    NUM_DECADE: Decade.of(PositiveInteger.of(3)),
                    RR: PositiveFloat.of(1.1),
                    CRR: CodeCalcul.of(PositiveInteger.of(0)),
                    TN: -3.3,
                    CTN: CodeCalcul.of(PositiveInteger.of(0)),
                    TX: -3.3,
                    CTX: CodeCalcul.of(PositiveInteger.of(0)),
                    FFM: PositiveFloat.of(1.1),
                    CFFM: CodeCalcul.of(PositiveInteger.of(0)),
                    TSVM: PositiveFloat.of(1.1),
                    CTSVM: CodeCalcul.of(PositiveInteger.of(0)),
                    INST: PositiveInteger.of(4),
                    CINST: AngstromCodeCalcul.of(PositiveInteger.of(2)),
                    GLOT: PositiveInteger.of(4),
                    CGLOT: AngstromCodeCalcul.of(PositiveInteger.of(2)),
                    ETP: PositiveFloat.of(1.1),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMM: new Date('2023-02-01T00:00:00Z'),
                    NUM_DECADE: Decade.of(PositiveInteger.of(1)),
                    RR: PositiveFloat.of(null),
                    CRR: CodeCalcul.of(PositiveInteger.of(null)),
                    TN: null,
                    CTN: CodeCalcul.of(PositiveInteger.of(null)),
                    TX: null,
                    CTX: CodeCalcul.of(PositiveInteger.of(null)),
                    FFM: PositiveFloat.of(null),
                    CFFM: CodeCalcul.of(PositiveInteger.of(null)),
                    TSVM: PositiveFloat.of(null),
                    CTSVM: CodeCalcul.of(PositiveInteger.of(null)),
                    INST: PositiveInteger.of(null),
                    CINST: AngstromCodeCalcul.of(PositiveInteger.of(null)),
                    GLOT: PositiveInteger.of(null),
                    CGLOT: AngstromCodeCalcul.of(PositiveInteger.of(null)),
                    ETP: PositiveFloat.of(null),
                },
            ]);
        });
    });
});
