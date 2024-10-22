import { parseCSV } from '@/csv/parseCSV.js';
import {
    AltitudeSchema,
    CodeQualiteSchema,
    FloatOrNullSchema,
    LatitudeSchema,
    LongitudeSchema,
    NomUsuelSchema,
    NumeroPosteSchema,
    ParseError,
    PositiveFloatSchema,
    PositiveIntegerSchema,
    TimeSchema,
    WindDirectionSchema,
} from '@/csv/parseCSVUtils.js';
import { DateSchema } from '@/csv/quotidiennes/parseCSVUtils.js';
import { Result } from '@/lib/resultUtils.js';
import { z } from 'zod';

const quotidienneLineSchema = z.object({
    NUM_POSTE: NumeroPosteSchema,
    NOM_USUEL: NomUsuelSchema,
    LAT: LatitudeSchema,
    LON: LongitudeSchema,
    ALTI: AltitudeSchema,
    AAAAMMJJ: DateSchema,

    // RR          : quantité de précipitation tombée en 24 heures (de 06h FU le jour J à 06h FU le jour J+1). La valeur relevée à J+1 est affectée au jour J (en mm et 1/10)
    RR: PositiveFloatSchema, // 1.1
    QRR: CodeQualiteSchema, // 9

    // TN          : température minimale sous abri (en °C et 1/10)
    TN: FloatOrNullSchema, // -2.2
    QTN: CodeQualiteSchema, // 9

    // HTN         : heure de TN (hhmm)
    HTN: TimeSchema, // 1230
    QHTN: CodeQualiteSchema, // 9

    // TX          : température maximale sous abri (en °C et 1/10)
    TX: FloatOrNullSchema, // -2.2
    QTX: CodeQualiteSchema, // 9

    // HTX         : heure de TX (hhmm)
    HTX: TimeSchema, // 1230
    QHTX: CodeQualiteSchema, // 9

    // TM          : moyenne quotidienne des températures horaires sous abri (en °C et 1/10)
    TM: FloatOrNullSchema, // -2.2
    QTM: CodeQualiteSchema, // 9

    // TNTXM       : moyenne quotidienne (TN+TX)/2 (en °C et 1/10)
    TNTXM: FloatOrNullSchema, // -2.2
    QTNTXM: CodeQualiteSchema, // 9

    // TAMPLI      : amplitude thermique quotidienne : écart entre TX et TN quotidiens (TX-TN) (en °C et 1/10)
    TAMPLI: PositiveFloatSchema, // 1.1
    QTAMPLI: CodeQualiteSchema, // 9

    // TNSOL       : température quotidienne minimale à 10 cm au-dessus du sol (en °C et 1/10)
    TNSOL: FloatOrNullSchema, // -2.2
    QTNSOL: CodeQualiteSchema, // 9

    // TN50        : température quotidienne minimale à 50 cm au-dessus du sol (en °C et 1/10)
    TN50: FloatOrNullSchema, // -2.2
    QTN50: CodeQualiteSchema, // 9

    // DG          : durée de gel sous abri (T ≤ 0°C) (en mn)
    DG: PositiveIntegerSchema, // 3
    QDG: CodeQualiteSchema, // 9

    // FFM         : moyenne quotidienne de la force du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FFM: PositiveFloatSchema, // 1.1
    QFFM: CodeQualiteSchema, // 9

    // FF2M        : moyenne quotidienne de la force du vent moyenné sur 10 mn, à 2 m (en m/s et 1/10)
    FF2M: PositiveFloatSchema, // 1.1
    QFF2M: CodeQualiteSchema, // 9

    // FXY         : maximum quotidien de la force maximale horaire du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FXY: PositiveFloatSchema, // 1.1
    QFXY: CodeQualiteSchema, // 9

    // DXY         : direction de FXY (en rose de 360)
    DXY: WindDirectionSchema, // 360
    QDXY: CodeQualiteSchema, // 9

    // HXY         : heure de FXY (hhmm)
    HXY: TimeSchema, // 1230
    QHXY: CodeQualiteSchema, // 9

    // FXI         : maximum quotidien de la force maximale horaire du vent instantané, à 10 m (en m/s et 1/10)
    FXI: PositiveFloatSchema, // 1.1
    QFXI: CodeQualiteSchema, // 9

    // DXI         : direction de FXI (en rose de 360)
    DXI: WindDirectionSchema, // 360
    QDXI: CodeQualiteSchema, // 9

    // HXI         : heure de FXI (hhmm)
    HXI: TimeSchema, // 1230
    QHXI: CodeQualiteSchema, // 9

    // FXI2        : maximum quotidien de la force maximale horaire du vent instantané, à 2 m (en m/s et 1/10)
    FXI2: PositiveFloatSchema, // 1.1
    QFXI2: CodeQualiteSchema, // 9

    // DXI2        : direction de FXI2 (en rose de 360)
    DXI2: WindDirectionSchema, // 360
    QDXI2: CodeQualiteSchema, // 9

    // HXI2        : heure de FXI2 (hhmm)
    HXI2: TimeSchema, // 1230
    QHXI2: CodeQualiteSchema, // 9

    // FXI3S       : maximum quotidien de la force maximale horaire du vent moyenné sur 3 s, à 10 m (en m/s et 1/10)
    FXI3S: PositiveFloatSchema, // 1.1
    QFXI3S: CodeQualiteSchema, // 9

    // DXI3S       : direction de FXI3S (en rose de 360)
    DXI3S: WindDirectionSchema, // 360
    QDXI3S: CodeQualiteSchema, // 9

    // HXI3S       : heure de FXI3S (hhmm)
    HXI3S: TimeSchema, // 1230
    QHXI3S: CodeQualiteSchema, // 9

    // DRR         : durée des précipitations (en mn)
    DRR: PositiveIntegerSchema, // 3
    QDRR: CodeQualiteSchema, // 9
});
export type QuotidienneLine = ReturnType<typeof quotidienneLineSchema.parse>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(quotidienneLineSchema.shape).map(key => [key, z.number()]))
);
export type QuotidienneHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): QuotidienneHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: QuotidienneHeaders): QuotidienneLine {
    const values = line.split(';').map(value => value.trim());
    return quotidienneLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseQuotidienneCSV(
    lines: AsyncGenerator<string>
): AsyncGenerator<Result<QuotidienneLine, ParseError<unknown>>> {
    return parseCSV<QuotidienneHeaders, QuotidienneLine>(lines, { parseHeaders, parseLine });
}

export function createReadingLineDebugMessage(line: QuotidienneLine): string {
    return `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJ.toISOString()}`;
}
