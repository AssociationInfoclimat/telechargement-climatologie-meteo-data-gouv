import {
    parseCodeQualite,
    parseFloatOrNull,
    parseInteger,
    parseJour,
    parseNbJours,
    parseNomUsuel,
    parseNumeroPoste,
    parsePercentage,
    parsePositiveFloat,
    parsePositiveInteger,
    parseWindDirection,
} from '@/csv/parseCSVUtils.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    return new Date(`${yyyy}-${mm}-01T00:00:00Z`);
}

export class InvalidDecadeError extends Error {
    constructor(decade: PositiveInteger) {
        super(`Invalid decade : '${decade}'. Must be an integer between 1 and 3.`);
    }
}

export class Decade {
    private readonly decade: PositiveInteger;

    private constructor(decade: PositiveInteger) {
        this.decade = decade;
    }

    static of(decade: PositiveInteger): Decade {
        const value = decade.value();
        if (value !== null && !(1 <= value && value <= 3)) {
            throw new InvalidDecadeError(decade);
        }
        return new Decade(decade);
    }

    value(): number | null {
        return this.decade.value();
    }

    toString(): string {
        return this.decade.toString();
    }
}

export function parseDecade(decade: string): Decade {
    return Decade.of(parsePositiveInteger(decade));
}

const decadaireLineSchema = z.object({
    NUM_POSTE: z.string().transform(parseNumeroPoste),
    NOM_USUEL: z.string().transform(parseNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(parseInteger),
    AAAAMM: z.string().transform(parseDate),
    NUM_DECADE: z.string().transform(parseDecade),
    // RR              : cumul mensuel des hauteurs de précipitation (en mm et 1/10)
    RR: z.string().transform(parsePositiveFloat), // 1.1
    // QRR             : code qualité de RR
    QRR: z.string().transform(parseCodeQualite), // 9
    // NBRR            : nombre de valeurs présentes de hauteur de précipitation quotidienne
    NBRR: z.string().transform(parseNbJours), // 31
    // RRAB            : précipitation maximale tombée en 24 heures au cours du mois
    RRAB: z.string().transform(parsePositiveFloat), // 1.1
    // QRRAB           : code qualite de RRAB
    QRRAB: z.string().transform(parseCodeQualite), // 9
    // RRABDAT         : jour du RRAB
    RRABDAT: z.string().transform(parseJour), // 15
    // NBJRR1          : nombre de jours avec RR ≥ 1.0 mm
    NBJRR1: z.string().transform(parseNbJours), // 31
    // NBJRR5          : nombre de jours avec RR ≥ 5.0 mm
    NBJRR5: z.string().transform(parseNbJours), // 31
    // NBJRR10         : nombre de jours avec RR ≥ 10.0 mm
    NBJRR10: z.string().transform(parseNbJours), // 31
    // NBJRR30         : nombre de jours avec RR ≥ 30.0 mm
    NBJRR30: z.string().transform(parseNbJours), // 31
    // NBJRR50         : nombre de jours avec RR ≥ 50.0 mm
    NBJRR50: z.string().transform(parseNbJours), // 31
    // NBJRR100        : nombre de jours avec RR ≥ 100.0 mm
    NBJRR100: z.string().transform(parseNbJours), // 31
    // PMERM           : moyenne decadaire des pressions mer moyennes (PMERM) quotidiennes (en hPa et 1/10)
    PMERM: z.string().transform(parsePositiveFloat), // 1.1
    // QPMERM          : code qualité de PMERM
    QPMERM: z.string().transform(parseCodeQualite), // 9
    // NBPMERM         : nombre de valeurs présentes de PMERM quotidienne
    NBPMERM: z.string().transform(parseNbJours), // 31
    // PMERMINAB       : minimum absolu mensuel des pressions mer moyennes quotidiennes (en hPa et 1/10)
    PMERMINAB: z.string().transform(parsePositiveFloat), // 1.1
    // QPMERMINAB      : code qualité de PMERMINAB
    QPMERMINAB: z.string().transform(parseCodeQualite), // 9
    // PMERMINABDAT    : jour du PMERMINAB maximum
    PMERMINABDAT: z.string().transform(parseJour), // 15
    // TX              : moyenne decadaire des températures maximales (TX) quotidiennes (en °C et 1/10)
    TX: z.string().transform(parsePositiveFloat), // 1.1
    // QTX             : code qualité de TX
    QTX: z.string().transform(parseCodeQualite), // 9
    // NBTX            : nombre de valeurs présentes de TX quotidienne
    NBTX: z.string().transform(parseNbJours), // 31
    // TXAB            : maximum absolu mensuel des TX quotidiennes (en °C et 1/10)
    TXAB: z.string().transform(parseFloatOrNull), // -2.2
    // QTXAB           : code qualité de TXAB
    QTXAB: z.string().transform(parseCodeQualite), // 9
    // TXDAT           : jour du TXAB
    TXDAT: z.string().transform(parseJour), // 15
    // TXMIN           : minimum mensuel des TX quotidiennes (en °C et 1/10)
    TXMIN: z.string().transform(parseFloatOrNull), // -2.2
    // QTXMIN          : code qualité de TXMIN
    QTXMIN: z.string().transform(parseCodeQualite), // 9
    // TXMINDAT        : jour du TXMIN
    TXMINDAT: z.string().transform(parseJour), // 15
    // NBJTX0          : nombre de jours avec TX ≤ 0°C
    NBJTX0: z.string().transform(parseNbJours), // 31
    // NBJTX25         : nombre de jours avec TX ≥ 25°C
    NBJTX25: z.string().transform(parseNbJours), // 31
    // NBJTX30         : nombre de jours avec TX ≥ 30°C
    NBJTX30: z.string().transform(parseNbJours), // 31
    // NBJTX35         : nombre de jours avec TX ≥ 35°C
    NBJTX35: z.string().transform(parseNbJours), // 31
    // NBJTXI20        : nombre de jours avec TX ≤ 20°C
    NBJTXI20: z.string().transform(parseNbJours), // 31
    // NBJTXI27        : nombre de jours avec TX ≤ 27°C
    NBJTXI27: z.string().transform(parseNbJours), // 31
    // NBJTXS32        : nombre de jours avec TX ≥ 32°C
    NBJTXS32: z.string().transform(parseNbJours), // 31
    // TN              : moyenne decadaire des températures minimales (TN) quotidiennes (en °C et 1/10)
    TN: z.string().transform(parseFloatOrNull), // -2.2
    // QTN             : code qualité de TN
    QTN: z.string().transform(parseCodeQualite), // 9
    // NBTN            : nombre de valeurs présentes de TN quotidienne
    NBTN: z.string().transform(parseNbJours), // 31
    // TNAB            : minimum absolu mensuel des TN quotidiennes (en °C et 1/10)
    TNAB: z.string().transform(parseFloatOrNull), // -2.2
    // QTNAB           : code qualité de TNAB
    QTNAB: z.string().transform(parseCodeQualite), // 9
    // TNDAT           : jour du TNAB
    TNDAT: z.string().transform(parseJour), // 15
    // TNMAX           : maximum mensuel des TN quotidiennes (en °C et 1/10)
    TNMAX: z.string().transform(parseFloatOrNull), // -2.2
    // QTNMAX          : code qualité de TNMAX
    QTNMAX: z.string().transform(parseCodeQualite), // 9
    // TNMAXDAT        : jour du TNMAX
    TNMAXDAT: z.string().transform(parseJour), // 15
    // NBJTN5          : nombre de jours avec TN ≤ -5°C
    NBJTN5: z.string().transform(parseNbJours), // 31
    // NBJTN10         : nombre de jours avec TN ≤ -10°C
    NBJTN10: z.string().transform(parseNbJours), // 31
    // NBJTNI10        : nombre de jours avec TN ≤ +10°C
    NBJTNI10: z.string().transform(parseNbJours), // 31
    // NBJTNI15        : nombre de jours avec TN ≤ +15°C
    NBJTNI15: z.string().transform(parseNbJours), // 31
    // NBJTNI20        : nombre de jours avec TN ≤ +20°C
    NBJTNI20: z.string().transform(parseNbJours), // 31
    // NBJTNS20        : nombre de jours avec TN ≥ +20°C
    NBJTNS20: z.string().transform(parseNbJours), // 31
    // NBJTNS25        : nombre de jours avec TN ≥ +25°C
    NBJTNS25: z.string().transform(parseNbJours), // 31
    // NBJGELEE        : nombre de jours avec gelée
    NBJGELEE: z.string().transform(parseNbJours), // 31
    // TAMPLIM         : moyenne decadaire des amplitudes thermiques (TAMPLI) quotidiennes (en °C et 1/10)
    TAMPLIM: z.string().transform(parsePositiveFloat), // 1.1
    // QTAMPLIM        : code qualité du TAMPLIM
    QTAMPLIM: z.string().transform(parseCodeQualite), // 9
    // TAMPLIAB        : maximum absolu mensuel des amplitudes thermiques quotidiennes (en °C et 1/10)
    TAMPLIAB: z.string().transform(parsePositiveFloat), // 1.1
    // QTAMPLIAB       : code qualité du TAMPLIAB
    QTAMPLIAB: z.string().transform(parseCodeQualite), // 9
    // TAMPLIABDAT     : jour du TAMPLIAB
    TAMPLIABDAT: z.string().transform(parseJour), // 15
    // NBTAMPLI        : nombre de valeurs présentes de TAMPLI quotidienne
    NBTAMPLI: z.string().transform(parseNbJours), // 31
    // TM              : moyenne decadaire des (TN+TX)/2 quotidiennes (en °C et 1/10)
    TM: z.string().transform(parseFloatOrNull), // -2.2
    // QTM             : code qualité de TM
    QTM: z.string().transform(parseCodeQualite), // 9
    // NBTM            : nombre de valeurs présentes du couple (TN, TX) quotidien
    NBTM: z.string().transform(parseNbJours), // 31
    // TMM             : moyenne decadaire des températures moyennes (TM) quotidiennes (en °C et 1/10)
    TMM: z.string().transform(parseFloatOrNull), // -2.2
    // QTMM            : code qualité du TMM
    QTMM: z.string().transform(parseCodeQualite), // 9
    // NBTMM           : nombre de valeurs présentes de TM quotidienne
    NBTMM: z.string().transform(parseNbJours), // 31
    // NBJTMS24        : nombre de jours avec TM quotidienne ≥ 24°C
    NBJTMS24: z.string().transform(parseNbJours), // 31
    // TMMIN           : minimum mensuel des moyennes (TN+TX)/2 quotidiennes (en °C et 1/10)
    TMMIN: z.string().transform(parseFloatOrNull), // -2.2
    // QTMMIN          : code qualité de TMMIN
    QTMMIN: z.string().transform(parseCodeQualite), // 9
    // TMMINDAT        : jour du TMMIN
    TMMINDAT: z.string().transform(parseJour), // 15
    // TMMAX           : maximum mensuel des moyennes (TN+TX)/2 quotidiennes (en °C et 1/10)
    TMMAX: z.string().transform(parseFloatOrNull), // -2.2
    // QTMMAX          : code qualité du TMMAX
    QTMMAX: z.string().transform(parseCodeQualite), // 9
    // TMMAXDAT        : jour du TMMAX
    TMMAXDAT: z.string().transform(parseJour), // 15
    // UNAB            : minimum absolu mensuel des humidités relatives minimales (UN) quotidiennes (en %)
    UNAB: z.string().transform(parsePercentage), // 100
    // QUNAB           : code qualité de UNAB
    QUNAB: z.string().transform(parseCodeQualite), // 9
    // UNABDAT         : jour du UNAB
    UNABDAT: z.string().transform(parseJour), // 15
    // NBUN            : nombre de valeurs présentes de UN quotidienne
    NBUN: z.string().transform(parseNbJours), // 31
    // UXAB            : maximum absolu mensuel des humidités relatives maximales (UX) quotidiennes (en %)
    UXAB: z.string().transform(parsePercentage), // 100
    // QUXAB           : code qualité de UXAB
    QUXAB: z.string().transform(parseCodeQualite), // 9
    // UXABDAT         : jour du UXAB
    UXABDAT: z.string().transform(parseJour), // 15
    // NBUX            : nombre de valeurs présentes de UX quotidienne
    NBUX: z.string().transform(parseNbJours), // 31
    // UMM             : moyenne decadaire des humidités moyennes (UM) quotidiennes (en %)
    UMM: z.string().transform(parsePercentage), // 100
    // QUMM            : code qualité de UMM
    QUMM: z.string().transform(parseCodeQualite), // 9
    // NBUM            : nombre de valeurs présentes de UM quotidienne
    NBUM: z.string().transform(parseNbJours), // 31
    // TSVM            : moyenne decadaire de la tension de vapeur (en hPa et 1/10)
    TSVM: z.string().transform(parsePositiveFloat), // 1.1
    // QTSVM           : code qualité du TSVM
    QTSVM: z.string().transform(parseCodeQualite), // 9
    // NBTSVM          : nombre de valeurs présentes de TSV quotidienne
    NBTSVM: z.string().transform(parseNbJours), // 31
    // FXIAB           : maximum absolu mensuel de la force maximale quotidienne du vent instantané, à 10 m (en m/s et 1/10)
    FXIAB: z.string().transform(parsePositiveFloat), // 1.1
    // QFXIAB          : code qualité de FXIAB
    QFXIAB: z.string().transform(parseCodeQualite), // 9
    // DXIAB           : direction du FXIAB (en rose de 360)
    DXIAB: z.string().transform(parseWindDirection), // 359
    // QDXIAB          : code qualité de DXIAB
    QDXIAB: z.string().transform(parseCodeQualite), // 9
    // FXIDAT          : jour du FXIAB
    FXIDAT: z.string().transform(parseJour), // 15
    // NBJFF10         : nombre de jours avec FXI ≥ 10 m/s
    NBJFF10: z.string().transform(parseNbJours), // 31
    // NBJFF16         : nombre de jours avec FXI ≥ 16 m/s
    NBJFF16: z.string().transform(parseNbJours), // 31
    // NBJFF28         : nombre de jours avec FXI ≥ 28 m/s
    NBJFF28: z.string().transform(parseNbJours), // 31
    // NBFXI           : nombre de valeurs présentes de FXI quotidienne
    NBFXI: z.string().transform(parseNbJours), // 31
    // FXI3SAB         : maximum absolu mensuel de la force maximale quotidienne du vent moyenné sur 3 secondes, à 10 m (en m/s et 1/10)
    FXI3SAB: z.string().transform(parsePositiveFloat), // 1.1
    // QFXI3SAB        : code qualité de FXI3SAB
    QFXI3SAB: z.string().transform(parseCodeQualite), // 9
    // DXI3SAB         : direction associée à FXI3SAB (en rose de 360)
    DXI3SAB: z.string().transform(parseWindDirection), // 359
    // QDXI3SAB        : code qualité de DXI3SAB
    QDXI3SAB: z.string().transform(parseCodeQualite), // 9
    // FXI3SDAT        : jour du FXI3SAB
    FXI3SDAT: z.string().transform(parseJour), // 15
    // NBJFXI3S10      : nombre de jours avec FXI3S ≥ 10 m/s
    NBJFXI3S10: z.string().transform(parseNbJours), // 31
    // NBJFXI3S16      : nombre de jours avec FXI3S ≥ 16 m/s
    NBJFXI3S16: z.string().transform(parseNbJours), // 31
    // NBJFXI3S28      : nombre de jours avec FXI3S ≥ 28 m/s
    NBJFXI3S28: z.string().transform(parseNbJours), // 31
    // NBFXI3S         : nombre de valeurs présentes de FXI3S quotidienne
    NBFXI3S: z.string().transform(parseNbJours), // 31
    // FXYAB           : maximum absolu mensuel de la force maximale quotidienne du vent moyenné sur 10 mn (FXY), à 10 m (en m/s et 1/10)
    FXYAB: z.string().transform(parsePositiveFloat), // 1.1
    // QFXYAB          : code qualité du FXYAB
    QFXYAB: z.string().transform(parseCodeQualite), // 9
    // DXYAB           : direction associée à FXYAB (en rose de 360)
    DXYAB: z.string().transform(parseWindDirection), // 359
    // QDXYAB          : code qualité de DXYAB
    QDXYAB: z.string().transform(parseCodeQualite), // 9
    // FXYABDAT        : jour du FXYAB
    FXYABDAT: z.string().transform(parseJour), // 15
    // NBJFXY8         : nombre de jours avec FXY ≥ 8 m/s
    NBJFXY8: z.string().transform(parseNbJours), // 31
    // NBJFXY10        : nombre de jours avec FXY ≥ 10 m/s
    NBJFXY10: z.string().transform(parseNbJours), // 31
    // NBJFXY15        : nombre de jours avec FXY ≥ 15 m/s
    NBJFXY15: z.string().transform(parseNbJours), // 31
    // NBFXY           : nombre de valeurs présentes de FXY quotidienne
    NBFXY: z.string().transform(parseNbJours), // 31
    // FFM             : moyenne decadaire de la force moyenne quotidienne du vent moyenné sur 10 mn (FFM), à 10 m (en m/s et 1/10)
    FFM: z.string().transform(parsePositiveFloat), // 1.1
    // QFFM            : code qualité du FFM
    QFFM: z.string().transform(parseCodeQualite), // 9
    // NBFFM           : nombre de valeurs présentes de FFM quotidienne
    NBFFM: z.string().transform(parseNbJours), // 31
    // INST            : cumul mensuel des durées totales d’insolation quotidiennes (en mn)
    INST: z.string().transform(parsePositiveInteger), // 3
    // QINST           : code qualité du INST
    QINST: z.string().transform(parseCodeQualite), // 9
    // NBINST          : nombre de valeurs présentes de INST quotidienne
    NBINST: z.string().transform(parseNbJours), // 31
    // NBSIGMA0        : nombre de jours avec SIGMA = 0% (SIGMA est la fraction d'insolation par rapport à la durée du jour)
    NBSIGMA0: z.string().transform(parseNbJours), // 31
    // NBSIGMA20       : nombre de jours avec SIGMA ≤ 20%
    NBSIGMA20: z.string().transform(parseNbJours), // 31
    // NBSIGMA80       : nombre de jours avec SIGMA ≥ 80%
    NBSIGMA80: z.string().transform(parseNbJours), // 31
    // GLOT            : cumul mensuel du rayonnement global quotidien (en J/cm2)
    GLOT: z.string().transform(parsePositiveInteger), // 3
    // QGLOT           : code qualité du GLOT
    QGLOT: z.string().transform(parseCodeQualite), // 9
    // NBGLOT          : nombre de valeurs présentes de GLOT quotidien
    NBGLOT: z.string().transform(parseNbJours), // 31
    // DIFT            : cumul mensuel du rayonnement diffus quotidien (en J/cm2)
    DIFT: z.string().transform(parsePositiveInteger), // 3
    // QDIFT           : code qualité du DIFT
    QDIFT: z.string().transform(parseCodeQualite), // 9
    // NBDIFT          : nombre de valeurs présentes de DIFT quotidien
    NBDIFT: z.string().transform(parseNbJours), // 31
    // DIRT            : cumul mensuel du rayonnement direct quotidien (en J/cm2)
    DIRT: z.string().transform(parsePositiveInteger), // 3
    // QDIRT           : code qualité du DIRT
    QDIRT: z.string().transform(parseCodeQualite), // 9
    // NBDIRT          : nombre de valeurs présentes de DIRT quotidien
    NBDIRT: z.string().transform(parseNbJours), // 31
    // HNEIGEFTOT      : cumul mensuel de la hauteur de neige fraîche tombée en 24h (HNEIGEF quotidienne) (en cm)
    HNEIGEFTOT: z.string().transform(parsePositiveInteger), // 3
    // QHNEIGEFTOT     : code qualité du HNEIGEFTOT
    QHNEIGEFTOT: z.string().transform(parseCodeQualite), // 9
    // HNEIGEFAB       : maximum absolu mensuel de HNEIGEF (en cm)
    HNEIGEFAB: z.string().transform(parsePositiveInteger), // 3
    // QHNEIGEFAB      : code qualité du HNEIGEFAB
    QHNEIGEFAB: z.string().transform(parseCodeQualite), // 9
    // HNEIGEFDAT      : jour du HNEIGEFAB
    HNEIGEFDAT: z.string().transform(parseJour), // 15
    // NBHNEIGEF       : nombre de valeurs présentes de HNEIGEF quotidienne
    NBHNEIGEF: z.string().transform(parseNbJours), // 31
    // NBJNEIG         : nombre de jours avec précipitation de neige
    NBJNEIG: z.string().transform(parseNbJours), // 31
    // NBJHNEIGEF1     : nombre de jours avec chutes de neige en 24h supérieures à 1 cm (à partir de HNEIGEF quotidienne)
    NBJHNEIGEF1: z.string().transform(parseNbJours), // 31
    // NBJHNEIGEF5     : nombre de jours avec chutes de neige en 24h supérieures à 5 cm (à partir de HNEIGEF quotidienne)
    NBJHNEIGEF5: z.string().transform(parseNbJours), // 31
    // NBJHNEIGEF10    : nombre de jours avec chutes de neige en 24h supérieures à 10 cm (à partir de HNEIGEF quotidienne)
    NBJHNEIGEF10: z.string().transform(parseNbJours), // 31
    // NBJSOLNG        : nombre de jours avec sol couvert de neige (à partir de SOLNEIGE quotidien)
    NBJSOLNG: z.string().transform(parseNbJours), // 31
    // NEIGETOTM       : moyenne decadaire de l’épaisseur totale de neige mesurée quotidiennement à 6h (NEIGETOT06 quotidien) (en cm)
    NEIGETOTM: z.string().transform(parsePositiveInteger), // 3
    // QNEIGETOTM      : code qualité du NEIGETOTM
    QNEIGETOTM: z.string().transform(parseCodeQualite), // 9
    // NEIGETOTAB      : maximum absolu mensuel de l'épaisseur maximale de neige (NEIGETOTX) quotidienne (en cm)
    NEIGETOTAB: z.string().transform(parsePositiveInteger), // 3
    // QNEIGETOTAB     : code qualité du NEIGETOTAB
    QNEIGETOTAB: z.string().transform(parseCodeQualite), // 9
    // NEIGETOTABDAT   : jour du NEIGETOTAB
    NEIGETOTABDAT: z.string().transform(parseJour), // 15
    // NBJNEIGETOT1    : nombre de jours avec enneigement supérieur à 1cm (à partir de NEIGETOTX quotidienne)
    NBJNEIGETOT1: z.string().transform(parseNbJours), // 31
    // NBJNEIGETOT10   : nombre de jours avec enneigement supérieur à 10cm (à partir de NEIGETOTX quotidienne)
    NBJNEIGETOT10: z.string().transform(parseNbJours), // 31
    // NBJNEIGETOT30   : nombre de jours avec enneigement supérieur à 30cm (à partir de NEIGETOTX quotidienne)
    NBJNEIGETOT30: z.string().transform(parseNbJours), // 31
    // NBJGREL         : nombre de jours présents avec grêle
    NBJGREL: z.string().transform(parseNbJours), // 31
    // NBJORAG         : nombre de jours présents avec orage
    NBJORAG: z.string().transform(parseNbJours), // 31
    // NBJBROU         : nombre de jours présents avec brouillard
    NBJBROU: z.string().transform(parseNbJours), // 31
});
export type DecadaireLine = z.infer<typeof decadaireLineSchema>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(decadaireLineSchema.shape).map(key => [key, z.number()]))
);
export type DecadaireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): DecadaireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: DecadaireHeaders): DecadaireLine {
    const values = line.split(';').map(value => value.trim());
    return decadaireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function* parseCSV(lines: Generator<string>): Generator<DecadaireLine> {
    const headersNameToIndex = parseHeaders(lines.next().value as string);
    for (const line of lines) {
        if (line.trim()) {
            yield parseLine(line, headersNameToIndex);
        }
    }
}
