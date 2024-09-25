import { parseCSV, QuotidienneAutresParametresLine } from '@/csv/quotidiennes/autres-parametres/parseCSV.js';
import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { Octa } from '@/data/value-objects/Octa.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { Time } from '@/data/value-objects/Time.js';
import { UVIndex } from '@/data/value-objects/UVIndex.js';
import {
    getAsyncGeneratorFromArray,
    getResultsArraysFromAsyncResultGenerator,
} from '@/lib/generator/generatorUtils.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';
import { describe, expect, it } from 'vitest';

describe('parseCSV', () => {
    describe('parseCSV', () => {
        it('should parse the CSV', async () => {
            const csvLines = getAsyncGeneratorFromArray([
                'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMMJJ;DHUMEC;QDHUMEC;PMERM;QPMERM;PMERMIN;QPMERMIN;INST;QINST;GLOT;QGLOT;DIFT;QDIFT;DIRT;QDIRT;INFRART;QINFRART;UV;QUV;UV_INDICEX;QUV_INDICEX;SIGMA;QSIGMA;UN;QUN;HUN;QHUN;UX;QUX;HUX;QHUX;UM;QUM;DHUMI40;QDHUMI40;DHUMI80;QDHUMI80;TSVM;QTSVM;ETPMON;QETPMON;ETPGRILLE;QETPGRILLE;ECOULEMENTM;QECOULEMENTM;HNEIGEF;QHNEIGEF;NEIGETOTX;QNEIGETOTX;NEIGETOT06;QNEIGETOT06;NEIG;QNEIG;BROU;QBROU;ORAG;QORAG;GRESIL;QGRESIL;GRELE;QGRELE;ROSEE;QROSEE;VERGLAS;QVERGLAS;SOLNEIGE;QSOLNEIGE;GELEE;QGELEE;FUMEE;QFUMEE;BRUME;QBRUME;ECLAIR;QECLAIR;NB300;QNB300;BA300;QBA300;TMERMIN;QTMERMIN;TMERMAX;QTMERMAX',
                '01089001;AMBERIEU;45.976500;5.329333;250;19350112;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1;1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
                '01014002;ARBENT;46.278167;5.669000;534;20230101;;;;;;;;;;;;;;;;;;;;;;;43;1;1944;9;75;1;27;9;55;1;0;9;0;9;8.9;9;;;3.1;9;;;;;0;9;0;9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
                '01014002;ARBENT;46.278167;5.669000;534;20230102;1;9;2.2;9;2.2;9;1;9;1;9;1;9;1;9;1;9;12;9;12;9;100;9;100;9;1230;9;100;9;1230;9;100;9;1;9;1;9;2.2;9;2.2;9;2.2;9;2.2;9;1;9;1;9;1;9;0;9;0;9;0;9;0;9;0;9;0;9;0;9;0;9;0;9;0;9;0;9;0;9;8;9;1;9;-3.3;9;-3.3;9',
                '01014002;ARBENT;46.278167;5.669000;534;20230103;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
                '',
            ]);
            const infrahoraireLines = await getResultsArraysFromAsyncResultGenerator(parseCSV(csvLines));
            expect(infrahoraireLines.ok).toEqual<QuotidienneAutresParametresLine[]>([
                {
                    NUM_POSTE: NumeroPoste.of('01089001'),
                    NOM_USUEL: 'AMBERIEU',
                    LAT: 45.9765,
                    LON: 5.329333,
                    ALTI: 250,
                    AAAAMMJJ: new Date('1935-01-12T00:00:00Z'),
                    DHUMEC: PositiveInteger.of(null),
                    QDHUMEC: CodeQualite.of(PositiveInteger.of(null)),
                    PMERM: PositiveFloat.of(null),
                    QPMERM: CodeQualite.of(PositiveInteger.of(null)),
                    PMERMIN: PositiveFloat.of(null),
                    QPMERMIN: CodeQualite.of(PositiveInteger.of(null)),
                    INST: PositiveInteger.of(null),
                    QINST: CodeQualite.of(PositiveInteger.of(null)),
                    GLOT: PositiveInteger.of(null),
                    QGLOT: CodeQualite.of(PositiveInteger.of(null)),
                    DIFT: PositiveInteger.of(null),
                    QDIFT: CodeQualite.of(PositiveInteger.of(null)),
                    DIRT: PositiveInteger.of(null),
                    QDIRT: CodeQualite.of(PositiveInteger.of(null)),
                    INFRART: PositiveInteger.of(null),
                    QINFRART: CodeQualite.of(PositiveInteger.of(null)),
                    UV: UVIndex.of(PositiveInteger.of(null)),
                    QUV: CodeQualite.of(PositiveInteger.of(null)),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(null)),
                    QUV_INDICEX: CodeQualite.of(PositiveInteger.of(null)),
                    SIGMA: Percentage.of(PositiveInteger.of(null)),
                    QSIGMA: CodeQualite.of(PositiveInteger.of(null)),
                    UN: Percentage.of(PositiveInteger.of(null)),
                    QUN: CodeQualite.of(PositiveInteger.of(null)),
                    HUN: Time.of(''),
                    QHUN: CodeQualite.of(PositiveInteger.of(null)),
                    UX: Percentage.of(PositiveInteger.of(null)),
                    QUX: CodeQualite.of(PositiveInteger.of(null)),
                    HUX: Time.of(''),
                    QHUX: CodeQualite.of(PositiveInteger.of(null)),
                    UM: Percentage.of(PositiveInteger.of(null)),
                    QUM: CodeQualite.of(PositiveInteger.of(null)),
                    DHUMI40: PositiveInteger.of(null),
                    QDHUMI40: CodeQualite.of(PositiveInteger.of(null)),
                    DHUMI80: PositiveInteger.of(null),
                    QDHUMI80: CodeQualite.of(PositiveInteger.of(null)),
                    TSVM: PositiveFloat.of(null),
                    QTSVM: CodeQualite.of(PositiveInteger.of(null)),
                    ETPMON: PositiveFloat.of(null),
                    QETPMON: CodeQualite.of(PositiveInteger.of(null)),
                    ETPGRILLE: PositiveFloat.of(null),
                    QETPGRILLE: CodeQualite.of(PositiveInteger.of(null)),
                    ECOULEMENTM: PositiveFloat.of(null),
                    QECOULEMENTM: CodeQualite.of(PositiveInteger.of(null)),
                    HNEIGEF: PositiveInteger.of(null),
                    QHNEIGEF: CodeQualite.of(PositiveInteger.of(null)),
                    NEIGETOTX: PositiveInteger.of(null),
                    QNEIGETOTX: CodeQualite.of(PositiveInteger.of(null)),
                    NEIGETOT06: PositiveInteger.of(null),
                    QNEIGETOT06: CodeQualite.of(PositiveInteger.of(null)),
                    NEIG: true,
                    QNEIG: CodeQualite.of(PositiveInteger.of(1)),
                    BROU: null,
                    QBROU: CodeQualite.of(PositiveInteger.of(null)),
                    ORAG: null,
                    QORAG: CodeQualite.of(PositiveInteger.of(null)),
                    GRESIL: null,
                    QGRESIL: CodeQualite.of(PositiveInteger.of(null)),
                    GRELE: null,
                    QGRELE: CodeQualite.of(PositiveInteger.of(null)),
                    ROSEE: null,
                    QROSEE: CodeQualite.of(PositiveInteger.of(null)),
                    VERGLAS: null,
                    QVERGLAS: CodeQualite.of(PositiveInteger.of(null)),
                    SOLNEIGE: null,
                    QSOLNEIGE: CodeQualite.of(PositiveInteger.of(null)),
                    GELEE: null,
                    QGELEE: CodeQualite.of(PositiveInteger.of(null)),
                    FUMEE: null,
                    QFUMEE: CodeQualite.of(PositiveInteger.of(null)),
                    BRUME: null,
                    QBRUME: CodeQualite.of(PositiveInteger.of(null)),
                    ECLAIR: null,
                    QECLAIR: CodeQualite.of(PositiveInteger.of(null)),
                    NB300: Octa.of(PositiveInteger.of(null)),
                    QNB300: CodeQualite.of(PositiveInteger.of(null)),
                    BA300: PositiveInteger.of(null),
                    QBA300: CodeQualite.of(PositiveInteger.of(null)),
                    TMERMIN: null,
                    QTMERMIN: CodeQualite.of(PositiveInteger.of(null)),
                    TMERMAX: null,
                    QTMERMAX: CodeQualite.of(PositiveInteger.of(null)),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMMJJ: new Date('2023-01-01T00:00:00Z'),
                    DHUMEC: PositiveInteger.of(null),
                    QDHUMEC: CodeQualite.of(PositiveInteger.of(null)),
                    PMERM: PositiveFloat.of(null),
                    QPMERM: CodeQualite.of(PositiveInteger.of(null)),
                    PMERMIN: PositiveFloat.of(null),
                    QPMERMIN: CodeQualite.of(PositiveInteger.of(null)),
                    INST: PositiveInteger.of(null),
                    QINST: CodeQualite.of(PositiveInteger.of(null)),
                    GLOT: PositiveInteger.of(null),
                    QGLOT: CodeQualite.of(PositiveInteger.of(null)),
                    DIFT: PositiveInteger.of(null),
                    QDIFT: CodeQualite.of(PositiveInteger.of(null)),
                    DIRT: PositiveInteger.of(null),
                    QDIRT: CodeQualite.of(PositiveInteger.of(null)),
                    INFRART: PositiveInteger.of(null),
                    QINFRART: CodeQualite.of(PositiveInteger.of(null)),
                    UV: UVIndex.of(PositiveInteger.of(null)),
                    QUV: CodeQualite.of(PositiveInteger.of(null)),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(null)),
                    QUV_INDICEX: CodeQualite.of(PositiveInteger.of(null)),
                    SIGMA: Percentage.of(PositiveInteger.of(null)),
                    QSIGMA: CodeQualite.of(PositiveInteger.of(null)),
                    UN: Percentage.of(PositiveInteger.of(43)),
                    QUN: CodeQualite.of(PositiveInteger.of(1)),
                    HUN: Time.of('1944'),
                    QHUN: CodeQualite.of(PositiveInteger.of(9)),
                    UX: Percentage.of(PositiveInteger.of(75)),
                    QUX: CodeQualite.of(PositiveInteger.of(1)),
                    HUX: Time.of('27'),
                    QHUX: CodeQualite.of(PositiveInteger.of(9)),
                    UM: Percentage.of(PositiveInteger.of(55)),
                    QUM: CodeQualite.of(PositiveInteger.of(1)),
                    DHUMI40: PositiveInteger.of(0),
                    QDHUMI40: CodeQualite.of(PositiveInteger.of(9)),
                    DHUMI80: PositiveInteger.of(0),
                    QDHUMI80: CodeQualite.of(PositiveInteger.of(9)),
                    TSVM: PositiveFloat.of(8.9),
                    QTSVM: CodeQualite.of(PositiveInteger.of(9)),
                    ETPMON: PositiveFloat.of(null),
                    QETPMON: CodeQualite.of(PositiveInteger.of(null)),
                    ETPGRILLE: PositiveFloat.of(3.1),
                    QETPGRILLE: CodeQualite.of(PositiveInteger.of(9)),
                    ECOULEMENTM: PositiveFloat.of(null),
                    QECOULEMENTM: CodeQualite.of(PositiveInteger.of(null)),
                    HNEIGEF: PositiveInteger.of(null),
                    QHNEIGEF: CodeQualite.of(PositiveInteger.of(null)),
                    NEIGETOTX: PositiveInteger.of(0),
                    QNEIGETOTX: CodeQualite.of(PositiveInteger.of(9)),
                    NEIGETOT06: PositiveInteger.of(0),
                    QNEIGETOT06: CodeQualite.of(PositiveInteger.of(9)),
                    NEIG: null,
                    QNEIG: CodeQualite.of(PositiveInteger.of(null)),
                    BROU: null,
                    QBROU: CodeQualite.of(PositiveInteger.of(null)),
                    ORAG: null,
                    QORAG: CodeQualite.of(PositiveInteger.of(null)),
                    GRESIL: null,
                    QGRESIL: CodeQualite.of(PositiveInteger.of(null)),
                    GRELE: null,
                    QGRELE: CodeQualite.of(PositiveInteger.of(null)),
                    ROSEE: null,
                    QROSEE: CodeQualite.of(PositiveInteger.of(null)),
                    VERGLAS: null,
                    QVERGLAS: CodeQualite.of(PositiveInteger.of(null)),
                    SOLNEIGE: null,
                    QSOLNEIGE: CodeQualite.of(PositiveInteger.of(null)),
                    GELEE: null,
                    QGELEE: CodeQualite.of(PositiveInteger.of(null)),
                    FUMEE: null,
                    QFUMEE: CodeQualite.of(PositiveInteger.of(null)),
                    BRUME: null,
                    QBRUME: CodeQualite.of(PositiveInteger.of(null)),
                    ECLAIR: null,
                    QECLAIR: CodeQualite.of(PositiveInteger.of(null)),
                    NB300: Octa.of(PositiveInteger.of(null)),
                    QNB300: CodeQualite.of(PositiveInteger.of(null)),
                    BA300: PositiveInteger.of(null),
                    QBA300: CodeQualite.of(PositiveInteger.of(null)),
                    TMERMIN: null,
                    QTMERMIN: CodeQualite.of(PositiveInteger.of(null)),
                    TMERMAX: null,
                    QTMERMAX: CodeQualite.of(PositiveInteger.of(null)),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMMJJ: new Date('2023-01-02T00:00:00Z'),
                    DHUMEC: PositiveInteger.of(1),
                    QDHUMEC: CodeQualite.of(PositiveInteger.of(9)),
                    PMERM: PositiveFloat.of(2.2),
                    QPMERM: CodeQualite.of(PositiveInteger.of(9)),
                    PMERMIN: PositiveFloat.of(2.2),
                    QPMERMIN: CodeQualite.of(PositiveInteger.of(9)),
                    INST: PositiveInteger.of(1),
                    QINST: CodeQualite.of(PositiveInteger.of(9)),
                    GLOT: PositiveInteger.of(1),
                    QGLOT: CodeQualite.of(PositiveInteger.of(9)),
                    DIFT: PositiveInteger.of(1),
                    QDIFT: CodeQualite.of(PositiveInteger.of(9)),
                    DIRT: PositiveInteger.of(1),
                    QDIRT: CodeQualite.of(PositiveInteger.of(9)),
                    INFRART: PositiveInteger.of(1),
                    QINFRART: CodeQualite.of(PositiveInteger.of(9)),
                    UV: UVIndex.of(PositiveInteger.of(12)),
                    QUV: CodeQualite.of(PositiveInteger.of(9)),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(12)),
                    QUV_INDICEX: CodeQualite.of(PositiveInteger.of(9)),
                    SIGMA: Percentage.of(PositiveInteger.of(100)),
                    QSIGMA: CodeQualite.of(PositiveInteger.of(9)),
                    UN: Percentage.of(PositiveInteger.of(100)),
                    QUN: CodeQualite.of(PositiveInteger.of(9)),
                    HUN: Time.of('1230'),
                    QHUN: CodeQualite.of(PositiveInteger.of(9)),
                    UX: Percentage.of(PositiveInteger.of(100)),
                    QUX: CodeQualite.of(PositiveInteger.of(9)),
                    HUX: Time.of('1230'),
                    QHUX: CodeQualite.of(PositiveInteger.of(9)),
                    UM: Percentage.of(PositiveInteger.of(100)),
                    QUM: CodeQualite.of(PositiveInteger.of(9)),
                    DHUMI40: PositiveInteger.of(1),
                    QDHUMI40: CodeQualite.of(PositiveInteger.of(9)),
                    DHUMI80: PositiveInteger.of(1),
                    QDHUMI80: CodeQualite.of(PositiveInteger.of(9)),
                    TSVM: PositiveFloat.of(2.2),
                    QTSVM: CodeQualite.of(PositiveInteger.of(9)),
                    ETPMON: PositiveFloat.of(2.2),
                    QETPMON: CodeQualite.of(PositiveInteger.of(9)),
                    ETPGRILLE: PositiveFloat.of(2.2),
                    QETPGRILLE: CodeQualite.of(PositiveInteger.of(9)),
                    ECOULEMENTM: PositiveFloat.of(2.2),
                    QECOULEMENTM: CodeQualite.of(PositiveInteger.of(9)),
                    HNEIGEF: PositiveInteger.of(1),
                    QHNEIGEF: CodeQualite.of(PositiveInteger.of(9)),
                    NEIGETOTX: PositiveInteger.of(1),
                    QNEIGETOTX: CodeQualite.of(PositiveInteger.of(9)),
                    NEIGETOT06: PositiveInteger.of(1),
                    QNEIGETOT06: CodeQualite.of(PositiveInteger.of(9)),
                    NEIG: false,
                    QNEIG: CodeQualite.of(PositiveInteger.of(9)),
                    BROU: false,
                    QBROU: CodeQualite.of(PositiveInteger.of(9)),
                    ORAG: false,
                    QORAG: CodeQualite.of(PositiveInteger.of(9)),
                    GRESIL: false,
                    QGRESIL: CodeQualite.of(PositiveInteger.of(9)),
                    GRELE: false,
                    QGRELE: CodeQualite.of(PositiveInteger.of(9)),
                    ROSEE: false,
                    QROSEE: CodeQualite.of(PositiveInteger.of(9)),
                    VERGLAS: false,
                    QVERGLAS: CodeQualite.of(PositiveInteger.of(9)),
                    SOLNEIGE: false,
                    QSOLNEIGE: CodeQualite.of(PositiveInteger.of(9)),
                    GELEE: false,
                    QGELEE: CodeQualite.of(PositiveInteger.of(9)),
                    FUMEE: false,
                    QFUMEE: CodeQualite.of(PositiveInteger.of(9)),
                    BRUME: false,
                    QBRUME: CodeQualite.of(PositiveInteger.of(9)),
                    ECLAIR: false,
                    QECLAIR: CodeQualite.of(PositiveInteger.of(9)),
                    NB300: Octa.of(PositiveInteger.of(8)),
                    QNB300: CodeQualite.of(PositiveInteger.of(9)),
                    BA300: PositiveInteger.of(1),
                    QBA300: CodeQualite.of(PositiveInteger.of(9)),
                    TMERMIN: -3.3,
                    QTMERMIN: CodeQualite.of(PositiveInteger.of(9)),
                    TMERMAX: -3.3,
                    QTMERMAX: CodeQualite.of(PositiveInteger.of(9)),
                },
                {
                    NUM_POSTE: NumeroPoste.of('01014002'),
                    NOM_USUEL: 'ARBENT',
                    LAT: 46.278167,
                    LON: 5.669,
                    ALTI: 534,
                    AAAAMMJJ: new Date('2023-01-03T00:00:00Z'),
                    DHUMEC: PositiveInteger.of(null),
                    QDHUMEC: CodeQualite.of(PositiveInteger.of(null)),
                    PMERM: PositiveFloat.of(null),
                    QPMERM: CodeQualite.of(PositiveInteger.of(null)),
                    PMERMIN: PositiveFloat.of(null),
                    QPMERMIN: CodeQualite.of(PositiveInteger.of(null)),
                    INST: PositiveInteger.of(null),
                    QINST: CodeQualite.of(PositiveInteger.of(null)),
                    GLOT: PositiveInteger.of(null),
                    QGLOT: CodeQualite.of(PositiveInteger.of(null)),
                    DIFT: PositiveInteger.of(null),
                    QDIFT: CodeQualite.of(PositiveInteger.of(null)),
                    DIRT: PositiveInteger.of(null),
                    QDIRT: CodeQualite.of(PositiveInteger.of(null)),
                    INFRART: PositiveInteger.of(null),
                    QINFRART: CodeQualite.of(PositiveInteger.of(null)),
                    UV: UVIndex.of(PositiveInteger.of(null)),
                    QUV: CodeQualite.of(PositiveInteger.of(null)),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(null)),
                    QUV_INDICEX: CodeQualite.of(PositiveInteger.of(null)),
                    SIGMA: Percentage.of(PositiveInteger.of(null)),
                    QSIGMA: CodeQualite.of(PositiveInteger.of(null)),
                    UN: Percentage.of(PositiveInteger.of(null)),
                    QUN: CodeQualite.of(PositiveInteger.of(null)),
                    HUN: Time.of(''),
                    QHUN: CodeQualite.of(PositiveInteger.of(null)),
                    UX: Percentage.of(PositiveInteger.of(null)),
                    QUX: CodeQualite.of(PositiveInteger.of(null)),
                    HUX: Time.of(''),
                    QHUX: CodeQualite.of(PositiveInteger.of(null)),
                    UM: Percentage.of(PositiveInteger.of(null)),
                    QUM: CodeQualite.of(PositiveInteger.of(null)),
                    DHUMI40: PositiveInteger.of(null),
                    QDHUMI40: CodeQualite.of(PositiveInteger.of(null)),
                    DHUMI80: PositiveInteger.of(null),
                    QDHUMI80: CodeQualite.of(PositiveInteger.of(null)),
                    TSVM: PositiveFloat.of(null),
                    QTSVM: CodeQualite.of(PositiveInteger.of(null)),
                    ETPMON: PositiveFloat.of(null),
                    QETPMON: CodeQualite.of(PositiveInteger.of(null)),
                    ETPGRILLE: PositiveFloat.of(null),
                    QETPGRILLE: CodeQualite.of(PositiveInteger.of(null)),
                    ECOULEMENTM: PositiveFloat.of(null),
                    QECOULEMENTM: CodeQualite.of(PositiveInteger.of(null)),
                    HNEIGEF: PositiveInteger.of(null),
                    QHNEIGEF: CodeQualite.of(PositiveInteger.of(null)),
                    NEIGETOTX: PositiveInteger.of(null),
                    QNEIGETOTX: CodeQualite.of(PositiveInteger.of(null)),
                    NEIGETOT06: PositiveInteger.of(null),
                    QNEIGETOT06: CodeQualite.of(PositiveInteger.of(null)),
                    NEIG: null,
                    QNEIG: CodeQualite.of(PositiveInteger.of(null)),
                    BROU: null,
                    QBROU: CodeQualite.of(PositiveInteger.of(null)),
                    ORAG: null,
                    QORAG: CodeQualite.of(PositiveInteger.of(null)),
                    GRESIL: null,
                    QGRESIL: CodeQualite.of(PositiveInteger.of(null)),
                    GRELE: null,
                    QGRELE: CodeQualite.of(PositiveInteger.of(null)),
                    ROSEE: null,
                    QROSEE: CodeQualite.of(PositiveInteger.of(null)),
                    VERGLAS: null,
                    QVERGLAS: CodeQualite.of(PositiveInteger.of(null)),
                    SOLNEIGE: null,
                    QSOLNEIGE: CodeQualite.of(PositiveInteger.of(null)),
                    GELEE: null,
                    QGELEE: CodeQualite.of(PositiveInteger.of(null)),
                    FUMEE: null,
                    QFUMEE: CodeQualite.of(PositiveInteger.of(null)),
                    BRUME: null,
                    QBRUME: CodeQualite.of(PositiveInteger.of(null)),
                    ECLAIR: null,
                    QECLAIR: CodeQualite.of(PositiveInteger.of(null)),
                    NB300: Octa.of(PositiveInteger.of(null)),
                    QNB300: CodeQualite.of(PositiveInteger.of(null)),
                    BA300: PositiveInteger.of(null),
                    QBA300: CodeQualite.of(PositiveInteger.of(null)),
                    TMERMIN: null,
                    QTMERMIN: CodeQualite.of(PositiveInteger.of(null)),
                    TMERMAX: null,
                    QTMERMAX: CodeQualite.of(PositiveInteger.of(null)),
                },
            ]);
        });
    });
});
