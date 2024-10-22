import { parseCSV } from '@/csv/parseCSV.js';
import {
    onCatch,
    ParseError,
    toCodeQualite,
    toFloatOrNull,
    toInteger,
    toNomUsuel,
    toNumeroPoste,
    toPositiveFloat,
    toPositiveInteger,
    toTime,
    toWindDirection,
} from '@/csv/parseCSVUtils.js';
import { toDate } from '@/csv/quotidiennes/parseCSVUtils.js';
import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { Time } from '@/data/value-objects/Time.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { Result } from '@/lib/resultUtils.js';
import { z } from 'zod';

const quotidienneLineSchema = z.object({
    NUM_POSTE: z.string().transform(toNumeroPoste),
    NOM_USUEL: z.string().transform(toNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(toInteger),
    AAAAMMJJ: z.string().transform(toDate),

    // RR          : quantité de précipitation tombée en 24 heures (de 06h FU le jour J à 06h FU le jour J+1). La valeur relevée à J+1 est affectée au jour J (en mm et 1/10)
    RR: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QRR: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TN          : température minimale sous abri (en °C et 1/10)
    TN: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -2.2
    QTN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // HTN         : heure de TN (hhmm)
    HTN: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHTN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TX          : température maximale sous abri (en °C et 1/10)
    TX: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -2.2
    QTX: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // HTX         : heure de TX (hhmm)
    HTX: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHTX: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TM          : moyenne quotidienne des températures horaires sous abri (en °C et 1/10)
    TM: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -2.2
    QTM: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TNTXM       : moyenne quotidienne (TN+TX)/2 (en °C et 1/10)
    TNTXM: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -2.2
    QTNTXM: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TAMPLI      : amplitude thermique quotidienne : écart entre TX et TN quotidiens (TX-TN) (en °C et 1/10)
    TAMPLI: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QTAMPLI: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TNSOL       : température quotidienne minimale à 10 cm au-dessus du sol (en °C et 1/10)
    TNSOL: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -2.2
    QTNSOL: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // TN50        : température quotidienne minimale à 50 cm au-dessus du sol (en °C et 1/10)
    TN50: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -2.2
    QTN50: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // DG          : durée de gel sous abri (T ≤ 0°C) (en mn)
    DG: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3
    QDG: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // FFM         : moyenne quotidienne de la force du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FFM: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QFFM: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // FF2M        : moyenne quotidienne de la force du vent moyenné sur 10 mn, à 2 m (en m/s et 1/10)
    FF2M: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QFF2M: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // FXY         : maximum quotidien de la force maximale horaire du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FXY: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QFXY: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // DXY         : direction de FXY (en rose de 360)
    DXY: z
        .string()
        .transform(toWindDirection)
        .catch(ctx => {
            onCatch(ctx);
            return WindDirection.of(PositiveInteger.of(null));
        }), // 360
    QDXY: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // HXY         : heure de FXY (hhmm)
    HXY: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHXY: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // FXI         : maximum quotidien de la force maximale horaire du vent instantané, à 10 m (en m/s et 1/10)
    FXI: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QFXI: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // DXI         : direction de FXI (en rose de 360)
    DXI: z
        .string()
        .transform(toWindDirection)
        .catch(ctx => {
            onCatch(ctx);
            return WindDirection.of(PositiveInteger.of(null));
        }), // 360
    QDXI: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // HXI         : heure de FXI (hhmm)
    HXI: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHXI: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // FXI2        : maximum quotidien de la force maximale horaire du vent instantané, à 2 m (en m/s et 1/10)
    FXI2: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QFXI2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // DXI2        : direction de FXI2 (en rose de 360)
    DXI2: z
        .string()
        .transform(toWindDirection)
        .catch(ctx => {
            onCatch(ctx);
            return WindDirection.of(PositiveInteger.of(null));
        }), // 360
    QDXI2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // HXI2        : heure de FXI2 (hhmm)
    HXI2: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHXI2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // FXI3S       : maximum quotidien de la force maximale horaire du vent moyenné sur 3 s, à 10 m (en m/s et 1/10)
    FXI3S: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 1.1
    QFXI3S: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // DXI3S       : direction de FXI3S (en rose de 360)
    DXI3S: z
        .string()
        .transform(toWindDirection)
        .catch(ctx => {
            onCatch(ctx);
            return WindDirection.of(PositiveInteger.of(null));
        }), // 360
    QDXI3S: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // HXI3S       : heure de FXI3S (hhmm)
    HXI3S: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHXI3S: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9

    // DRR         : durée des précipitations (en mn)
    DRR: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3
    QDRR: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
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
