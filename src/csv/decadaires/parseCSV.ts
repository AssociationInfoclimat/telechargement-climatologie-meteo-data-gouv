import { parseCSV } from '@/csv/parseCSV.js';
import {
    AltitudeSchema,
    CodeQualiteSchema,
    DecadeSchema,
    FloatOrNullSchema,
    HumiditeRelativeSchema,
    JourSchema,
    LatitudeSchema,
    LongitudeSchema,
    NbJoursSchema,
    NomUsuelSchema,
    NumeroPosteSchema,
    ParseError,
    PositiveFloatSchema,
    PositiveIntegerSchema,
    tmpFixHeader,
    WindDirectionSchema,
} from '@/csv/parseCSVUtils.js';
import { createTransform } from '@/lib/createTransform.js';
import { Result } from '@/lib/resultUtils.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    return new Date(`${yyyy}-${mm}-01T00:00:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

export const decadaireLineSchema = z.object({
    NUM_POSTE: NumeroPosteSchema,
    NOM_USUEL: NomUsuelSchema,
    LAT: LatitudeSchema,
    LON: LongitudeSchema,
    ALTI: AltitudeSchema,
    AAAAMM: DateSchema,
    NUM_DECADE: DecadeSchema,
    // RR              : cumul mensuel des hauteurs de précipitation (en mm et 1/10)
    RR: PositiveFloatSchema, // 1.1
    // QRR             : code qualité de RR
    QRR: CodeQualiteSchema, // 9
    // NBRR            : nombre de valeurs présentes de hauteur de précipitation quotidienne
    NBRR: NbJoursSchema, // 31
    // RRAB            : précipitation maximale tombée en 24 heures au cours du mois
    RRAB: PositiveFloatSchema, // 1.1
    // QRRAB           : code qualite de RRAB
    QRRAB: CodeQualiteSchema, // 9
    // RRABDAT         : jour du RRAB
    RRABDAT: JourSchema, // 15
    // NBJRR1          : nombre de jours avec RR ≥ 1.0 mm
    NBJRR1: NbJoursSchema, // 31
    // NBJRR5          : nombre de jours avec RR ≥ 5.0 mm
    NBJRR5: NbJoursSchema, // 31
    // NBJRR10         : nombre de jours avec RR ≥ 10.0 mm
    NBJRR10: NbJoursSchema, // 31
    // NBJRR30         : nombre de jours avec RR ≥ 30.0 mm
    NBJRR30: NbJoursSchema, // 31
    // NBJRR50         : nombre de jours avec RR ≥ 50.0 mm
    NBJRR50: NbJoursSchema, // 31
    // NBJRR100        : nombre de jours avec RR ≥ 100.0 mm
    NBJRR100: NbJoursSchema, // 31
    // PMERM           : moyenne decadaire des pressions mer moyennes (PMERM) quotidiennes (en hPa et 1/10)
    PMERM: PositiveFloatSchema, // 1.1
    // QPMERM          : code qualité de PMERM
    QPMERM: CodeQualiteSchema, // 9
    // NBPMERM         : nombre de valeurs présentes de PMERM quotidienne
    NBPMERM: NbJoursSchema, // 31
    // PMERMINAB       : minimum absolu mensuel des pressions mer moyennes quotidiennes (en hPa et 1/10)
    PMERMINAB: PositiveFloatSchema, // 1.1
    // QPMERMINAB      : code qualité de PMERMINAB
    QPMERMINAB: CodeQualiteSchema, // 9
    // PMERMINABDAT    : jour du PMERMINAB maximum
    PMERMINABDAT: JourSchema, // 15
    // TX              : moyenne decadaire des températures maximales (TX) quotidiennes (en °C et 1/10)
    TX: FloatOrNullSchema, // -2.2
    // QTX             : code qualité de TX
    QTX: CodeQualiteSchema, // 9
    // NBTX            : nombre de valeurs présentes de TX quotidienne
    NBTX: NbJoursSchema, // 31
    // TXAB            : maximum absolu mensuel des TX quotidiennes (en °C et 1/10)
    TXAB: FloatOrNullSchema, // -2.2
    // QTXAB           : code qualité de TXAB
    QTXAB: CodeQualiteSchema, // 9
    // TXDAT           : jour du TXAB
    TXDAT: JourSchema, // 15
    // TXMIN           : minimum mensuel des TX quotidiennes (en °C et 1/10)
    TXMIN: FloatOrNullSchema, // -2.2
    // QTXMIN          : code qualité de TXMIN
    QTXMIN: CodeQualiteSchema, // 9
    // TXMINDAT        : jour du TXMIN
    TXMINDAT: JourSchema, // 15
    // NBJTX0          : nombre de jours avec TX ≤ 0°C
    NBJTX0: NbJoursSchema, // 31
    // NBJTX25         : nombre de jours avec TX ≥ 25°C
    NBJTX25: NbJoursSchema, // 31
    // NBJTX30         : nombre de jours avec TX ≥ 30°C
    NBJTX30: NbJoursSchema, // 31
    // NBJTX35         : nombre de jours avec TX ≥ 35°C
    NBJTX35: NbJoursSchema, // 31
    // NBJTXI20        : nombre de jours avec TX ≤ 20°C
    NBJTXI20: NbJoursSchema, // 31
    // NBJTXI27        : nombre de jours avec TX ≤ 27°C
    NBJTXI27: NbJoursSchema, // 31
    // NBJTXS32        : nombre de jours avec TX ≥ 32°C
    NBJTXS32: NbJoursSchema, // 31
    // TN              : moyenne decadaire des températures minimales (TN) quotidiennes (en °C et 1/10)
    TN: FloatOrNullSchema, // -2.2
    // QTN             : code qualité de TN
    QTN: CodeQualiteSchema, // 9
    // NBTN            : nombre de valeurs présentes de TN quotidienne
    NBTN: NbJoursSchema, // 31
    // TNAB            : minimum absolu mensuel des TN quotidiennes (en °C et 1/10)
    TNAB: FloatOrNullSchema, // -2.2
    // QTNAB           : code qualité de TNAB
    QTNAB: CodeQualiteSchema, // 9
    // TNDAT           : jour du TNAB
    TNDAT: JourSchema, // 15
    // TNMAX           : maximum mensuel des TN quotidiennes (en °C et 1/10)
    TNMAX: FloatOrNullSchema, // -2.2
    // QTNMAX          : code qualité de TNMAX
    QTNMAX: CodeQualiteSchema, // 9
    // TNMAXDAT        : jour du TNMAX
    TNMAXDAT: JourSchema, // 15
    // NBJTN5          : nombre de jours avec TN ≤ -5°C
    NBJTN5: NbJoursSchema, // 31
    // NBJTN10         : nombre de jours avec TN ≤ -10°C
    NBJTN10: NbJoursSchema, // 31
    // NBJTNI10        : nombre de jours avec TN ≤ +10°C
    NBJTNI10: NbJoursSchema, // 31
    // NBJTNI15        : nombre de jours avec TN ≤ +15°C
    NBJTNI15: NbJoursSchema, // 31
    // NBJTNI20        : nombre de jours avec TN ≤ +20°C
    NBJTNI20: NbJoursSchema, // 31
    // NBJTNS20        : nombre de jours avec TN ≥ +20°C
    NBJTNS20: NbJoursSchema, // 31
    // NBJTNS25        : nombre de jours avec TN ≥ +25°C
    NBJTNS25: NbJoursSchema, // 31
    // NBJGELEE        : nombre de jours avec gelée
    NBJGELEE: NbJoursSchema, // 31
    // TAMPLIM         : moyenne decadaire des amplitudes thermiques (TAMPLI) quotidiennes (en °C et 1/10)
    TAMPLIM: PositiveFloatSchema, // 1.1
    // QTAMPLIM        : code qualité du TAMPLIM
    QTAMPLIM: CodeQualiteSchema, // 9
    // TAMPLIAB        : maximum absolu mensuel des amplitudes thermiques quotidiennes (en °C et 1/10)
    TAMPLIAB: PositiveFloatSchema, // 1.1
    // QTAMPLIAB       : code qualité du TAMPLIAB
    QTAMPLIAB: CodeQualiteSchema, // 9
    // TAMPLIABDAT     : jour du TAMPLIAB
    TAMPLIABDAT: JourSchema, // 15
    // NBTAMPLI        : nombre de valeurs présentes de TAMPLI quotidienne
    NBTAMPLI: NbJoursSchema, // 31
    // TM              : moyenne decadaire des (TN+TX)/2 quotidiennes (en °C et 1/10)
    TM: FloatOrNullSchema, // -2.2
    // QTM             : code qualité de TM
    QTM: CodeQualiteSchema, // 9
    // NBTM            : nombre de valeurs présentes du couple (TN, TX) quotidien
    NBTM: NbJoursSchema, // 31
    // TMM             : moyenne decadaire des températures moyennes (TM) quotidiennes (en °C et 1/10)
    TMM: FloatOrNullSchema, // -2.2
    // QTMM            : code qualité du TMM
    QTMM: CodeQualiteSchema, // 9
    // NBTMM           : nombre de valeurs présentes de TM quotidienne
    NBTMM: NbJoursSchema, // 31
    // NBJTMS24        : nombre de jours avec TM quotidienne ≥ 24°C
    NBJTMS24: NbJoursSchema, // 31
    // TMMIN           : minimum mensuel des moyennes (TN+TX)/2 quotidiennes (en °C et 1/10)
    TMMIN: FloatOrNullSchema, // -2.2
    // QTMMIN          : code qualité de TMMIN
    QTMMIN: CodeQualiteSchema, // 9
    // TMMINDAT        : jour du TMMIN
    TMMINDAT: JourSchema, // 15
    // TMMAX           : maximum mensuel des moyennes (TN+TX)/2 quotidiennes (en °C et 1/10)
    TMMAX: FloatOrNullSchema, // -2.2
    // QTMMAX          : code qualité du TMMAX
    QTMMAX: CodeQualiteSchema, // 9
    // TMMAXDAT        : jour du TMMAX
    TMMAXDAT: JourSchema, // 15
    // UNAB            : minimum absolu mensuel des humidités relatives minimales (UN) quotidiennes (en %)
    UNAB: HumiditeRelativeSchema, // 100
    // QUNAB           : code qualité de UNAB
    QUNAB: CodeQualiteSchema, // 9
    // UNABDAT         : jour du UNAB
    UNABDAT: JourSchema, // 15
    // NBUN            : nombre de valeurs présentes de UN quotidienne
    NBUN: NbJoursSchema, // 31
    // UXAB            : maximum absolu mensuel des humidités relatives maximales (UX) quotidiennes (en %)
    UXAB: HumiditeRelativeSchema, // 100
    // QUXAB           : code qualité de UXAB
    QUXAB: CodeQualiteSchema, // 9
    // UXABDAT         : jour du UXAB
    UXABDAT: JourSchema, // 15
    // NBUX            : nombre de valeurs présentes de UX quotidienne
    NBUX: NbJoursSchema, // 31
    // UMM             : moyenne decadaire des humidités moyennes (UM) quotidiennes (en %)
    UMM: HumiditeRelativeSchema, // 100
    // QUMM            : code qualité de UMM
    QUMM: CodeQualiteSchema, // 9
    // NBUM            : nombre de valeurs présentes de UM quotidienne
    NBUM: NbJoursSchema, // 31
    // TSVM            : moyenne decadaire de la tension de vapeur (en hPa et 1/10)
    TSVM: PositiveFloatSchema, // 1.1
    // QTSVM           : code qualité du TSVM
    QTSVM: CodeQualiteSchema, // 9
    // NBTSVM          : nombre de valeurs présentes de TSV quotidienne
    NBTSVM: NbJoursSchema, // 31
    // FXIAB           : maximum absolu mensuel de la force maximale quotidienne du vent instantané, à 10 m (en m/s et 1/10)
    FXIAB: PositiveFloatSchema, // 1.1
    // QFXIAB          : code qualité de FXIAB
    QFXIAB: CodeQualiteSchema, // 9
    // DXIAB           : direction du FXIAB (en rose de 360)
    DXIAB: WindDirectionSchema, // 360
    // QDXIAB          : code qualité de DXIAB
    QDXIAB: CodeQualiteSchema, // 9
    // FXIDAT          : jour du FXIAB
    FXIDAT: JourSchema, // 15
    // NBJFF10         : nombre de jours avec FXI ≥ 10 m/s
    NBJFF10: NbJoursSchema, // 31
    // NBJFF16         : nombre de jours avec FXI ≥ 16 m/s
    NBJFF16: NbJoursSchema, // 31
    // NBJFF28         : nombre de jours avec FXI ≥ 28 m/s
    NBJFF28: NbJoursSchema, // 31
    // NBFXI           : nombre de valeurs présentes de FXI quotidienne
    NBFXI: NbJoursSchema, // 31
    // FXI3SAB         : maximum absolu mensuel de la force maximale quotidienne du vent moyenné sur 3 secondes, à 10 m (en m/s et 1/10)
    FXI3SAB: PositiveFloatSchema, // 1.1
    // QFXI3SAB        : code qualité de FXI3SAB
    QFXI3SAB: CodeQualiteSchema, // 9
    // DXI3SAB         : direction associée à FXI3SAB (en rose de 360)
    DXI3SAB: WindDirectionSchema, // 360
    // QDXI3SAB        : code qualité de DXI3SAB
    QDXI3SAB: CodeQualiteSchema, // 9
    // FXI3SDAT        : jour du FXI3SAB
    FXI3SDAT: JourSchema, // 15
    // NBJFXI3S10      : nombre de jours avec FXI3S ≥ 10 m/s
    NBJFXI3S10: NbJoursSchema, // 31
    // NBJFXI3S16      : nombre de jours avec FXI3S ≥ 16 m/s
    NBJFXI3S16: NbJoursSchema, // 31
    // NBJFXI3S28      : nombre de jours avec FXI3S ≥ 28 m/s
    NBJFXI3S28: NbJoursSchema, // 31
    // NBFXI3S         : nombre de valeurs présentes de FXI3S quotidienne
    NBFXI3S: NbJoursSchema, // 31
    // FXYAB           : maximum absolu mensuel de la force maximale quotidienne du vent moyenné sur 10 mn (FXY), à 10 m (en m/s et 1/10)
    FXYAB: PositiveFloatSchema, // 1.1
    // QFXYAB          : code qualité du FXYAB
    QFXYAB: CodeQualiteSchema, // 9
    // DXYAB           : direction associée à FXYAB (en rose de 360)
    DXYAB: WindDirectionSchema, // 360
    // QDXYAB          : code qualité de DXYAB
    QDXYAB: CodeQualiteSchema, // 9
    // FXYABDAT        : jour du FXYAB
    FXYABDAT: JourSchema, // 15
    // NBJFXY8         : nombre de jours avec FXY ≥ 8 m/s
    NBJFXY8: NbJoursSchema, // 31
    // NBJFXY10        : nombre de jours avec FXY ≥ 10 m/s
    NBJFXY10: NbJoursSchema, // 31
    // NBJFXY15        : nombre de jours avec FXY ≥ 15 m/s
    NBJFXY15: NbJoursSchema, // 31
    // NBFXY           : nombre de valeurs présentes de FXY quotidienne
    NBFXY: NbJoursSchema, // 31
    // FFM             : moyenne decadaire de la force moyenne quotidienne du vent moyenné sur 10 mn (FFM), à 10 m (en m/s et 1/10)
    FFM: PositiveFloatSchema, // 1.1
    // QFFM            : code qualité du FFM
    QFFM: CodeQualiteSchema, // 9
    // NBFFM           : nombre de valeurs présentes de FFM quotidienne
    NBFFM: NbJoursSchema, // 31
    // INST            : cumul mensuel des durées totales d’insolation quotidiennes (en mn)
    INST: PositiveIntegerSchema, // 3
    // QINST           : code qualité du INST
    QINST: CodeQualiteSchema, // 9
    // NBINST          : nombre de valeurs présentes de INST quotidienne
    NBINST: NbJoursSchema, // 31
    // NBSIGMA0        : nombre de jours avec SIGMA = 0% (SIGMA est la fraction d'insolation par rapport à la durée du jour)
    NBSIGMA0: NbJoursSchema, // 31
    // NBSIGMA20       : nombre de jours avec SIGMA ≤ 20%
    NBSIGMA20: NbJoursSchema, // 31
    // NBSIGMA80       : nombre de jours avec SIGMA ≥ 80%
    NBSIGMA80: NbJoursSchema, // 31
    // GLOT            : cumul mensuel du rayonnement global quotidien (en J/cm2)
    GLOT: PositiveIntegerSchema, // 3
    // QGLOT           : code qualité du GLOT
    QGLOT: CodeQualiteSchema, // 9
    // NBGLOT          : nombre de valeurs présentes de GLOT quotidien
    NBGLOT: NbJoursSchema, // 31
    // DIFT            : cumul mensuel du rayonnement diffus quotidien (en J/cm2)
    DIFT: PositiveIntegerSchema, // 3
    // QDIFT           : code qualité du DIFT
    QDIFT: CodeQualiteSchema, // 9
    // NBDIFT          : nombre de valeurs présentes de DIFT quotidien
    NBDIFT: NbJoursSchema, // 31
    // DIRT            : cumul mensuel du rayonnement direct quotidien (en J/cm2)
    DIRT: PositiveIntegerSchema, // 3
    // QDIRT           : code qualité du DIRT
    QDIRT: CodeQualiteSchema, // 9
    // NBDIRT          : nombre de valeurs présentes de DIRT quotidien
    NBDIRT: NbJoursSchema, // 31
    // HNEIGEFTOT      : cumul mensuel de la hauteur de neige fraîche tombée en 24h (HNEIGEF quotidienne) (en cm)
    HNEIGEFTOT: PositiveIntegerSchema, // 3
    // QHNEIGEFTOT     : code qualité du HNEIGEFTOT
    QHNEIGEFTOT: CodeQualiteSchema, // 9
    // HNEIGEFAB       : maximum absolu mensuel de HNEIGEF (en cm)
    HNEIGEFAB: PositiveIntegerSchema, // 3
    // QHNEIGEFAB      : code qualité du HNEIGEFAB
    QHNEIGEFAB: CodeQualiteSchema, // 9
    // HNEIGEFDAT      : jour du HNEIGEFAB
    HNEIGEFDAT: JourSchema, // 15
    // NBHNEIGEF       : nombre de valeurs présentes de HNEIGEF quotidienne
    NBHNEIGEF: NbJoursSchema, // 31
    // NBJNEIG         : nombre de jours avec précipitation de neige
    NBJNEIG: NbJoursSchema, // 31
    // NBJHNEIGEF1     : nombre de jours avec chutes de neige en 24h supérieures à 1 cm (à partir de HNEIGEF quotidienne)
    NBJHNEIGEF1: NbJoursSchema, // 31
    // NBJHNEIGEF5     : nombre de jours avec chutes de neige en 24h supérieures à 5 cm (à partir de HNEIGEF quotidienne)
    NBJHNEIGEF5: NbJoursSchema, // 31
    // NBJHNEIGEF10    : nombre de jours avec chutes de neige en 24h supérieures à 10 cm (à partir de HNEIGEF quotidienne)
    NBJHNEIGEF10: NbJoursSchema, // 31
    // NBJSOLNG        : nombre de jours avec sol couvert de neige (à partir de SOLNEIGE quotidien)
    NBJSOLNG: NbJoursSchema, // 31
    // NEIGETOTM       : moyenne decadaire de l’épaisseur totale de neige mesurée quotidiennement à 6h (NEIGETOT06 quotidien) (en cm)
    NEIGETOTM: PositiveIntegerSchema, // 3
    // QNEIGETOTM      : code qualité du NEIGETOTM
    QNEIGETOTM: CodeQualiteSchema, // 9
    // NEIGETOTAB      : maximum absolu mensuel de l'épaisseur maximale de neige (NEIGETOTX) quotidienne (en cm)
    NEIGETOTAB: PositiveIntegerSchema, // 3
    // QNEIGETOTAB     : code qualité du NEIGETOTAB
    QNEIGETOTAB: CodeQualiteSchema, // 9
    // NEIGETOTABDAT   : jour du NEIGETOTAB
    NEIGETOTABDAT: JourSchema, // 15
    // NBJNEIGETOT1    : nombre de jours avec enneigement supérieur à 1cm (à partir de NEIGETOTX quotidienne)
    NBJNEIGETOT1: NbJoursSchema, // 31
    // NBJNEIGETOT10   : nombre de jours avec enneigement supérieur à 10cm (à partir de NEIGETOTX quotidienne)
    NBJNEIGETOT10: NbJoursSchema, // 31
    // NBJNEIGETOT30   : nombre de jours avec enneigement supérieur à 30cm (à partir de NEIGETOTX quotidienne)
    NBJNEIGETOT30: NbJoursSchema, // 31
    // NBJGREL         : nombre de jours présents avec grêle
    NBJGREL: NbJoursSchema, // 31
    // NBJORAG         : nombre de jours présents avec orage
    NBJORAG: NbJoursSchema, // 31
    // NBJBROU         : nombre de jours présents avec brouillard
    NBJBROU: NbJoursSchema, // 31
});
export type DecadaireLine = z.infer<typeof decadaireLineSchema>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(decadaireLineSchema.shape).map(key => [key, z.number()]))
);
export type DecadaireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): DecadaireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [tmpFixHeader(header), index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: DecadaireHeaders): DecadaireLine {
    const values = line.split(';').map(value => value.trim());
    return decadaireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseDecadaireCSV(
    lines: AsyncGenerator<string>
): AsyncGenerator<Result<DecadaireLine, ParseError<unknown>>> {
    return parseCSV<DecadaireHeaders, DecadaireLine>(lines, { parseHeaders, parseLine });
}

export function createReadingLineDebugMessage(line: DecadaireLine): string {
    return `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}-${line.NUM_DECADE}`;
}
