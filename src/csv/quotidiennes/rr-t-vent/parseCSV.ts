import {
    parseCodeQualite,
    parseFloatOrNull,
    parseInteger,
    parseNomUsuel,
    parseNumeroPoste,
    parsePositiveFloat,
    parsePositiveInteger,
    parseTime,
    parseWindDirection,
} from '@/csv/parseCSVUtils.js';
import { parseDate } from '@/csv/quotidiennes/parseCSVUtils.js';
import { z } from 'zod';

const quotidienneLineSchema = z.object({
    NUM_POSTE: z.string().transform(parseNumeroPoste),
    NOM_USUEL: z.string().transform(parseNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(parseInteger),
    AAAAMMJJ: z.string().transform(parseDate),

    // RR          : quantité de précipitation tombée en 24 heures (de 06h FU le jour J à 06h FU le jour J+1). La valeur relevée à J+1 est affectée au jour J (en mm et 1/10)
    RR: z.string().transform(parsePositiveFloat), // 1.1
    QRR: z.string().transform(parseCodeQualite), // 9

    // TN          : température minimale sous abri (en °C et 1/10)
    TN: z.string().transform(parseFloatOrNull), // -2.2
    QTN: z.string().transform(parseCodeQualite), // 9

    // HTN         : heure de TN (hhmm)
    HTN: z.string().transform(parseTime), // 1230
    QHTN: z.string().transform(parseCodeQualite), // 9

    // TX          : température maximale sous abri (en °C et 1/10)
    TX: z.string().transform(parseFloatOrNull), // -2.2
    QTX: z.string().transform(parseCodeQualite), // 9

    // HTX         : heure de TX (hhmm)
    HTX: z.string().transform(parseTime), // 1230
    QHTX: z.string().transform(parseCodeQualite), // 9

    // TM          : moyenne quotidienne des températures horaires sous abri (en °C et 1/10)
    TM: z.string().transform(parseFloatOrNull), // -2.2
    QTM: z.string().transform(parseCodeQualite), // 9

    // TNTXM       : moyenne quotidienne (TN+TX)/2 (en °C et 1/10)
    TNTXM: z.string().transform(parseFloatOrNull), // -2.2
    QTNTXM: z.string().transform(parseCodeQualite), // 9

    // TAMPLI      : amplitude thermique quotidienne : écart entre TX et TN quotidiens (TX-TN) (en °C et 1/10)
    TAMPLI: z.string().transform(parsePositiveFloat), // 1.1
    QTAMPLI: z.string().transform(parseCodeQualite), // 9

    // TNSOL       : température quotidienne minimale à 10 cm au-dessus du sol (en °C et 1/10)
    TNSOL: z.string().transform(parseFloatOrNull), // -2.2
    QTNSOL: z.string().transform(parseCodeQualite), // 9

    // TN50        : température quotidienne minimale à 50 cm au-dessus du sol (en °C et 1/10)
    TN50: z.string().transform(parseFloatOrNull), // -2.2
    QTN50: z.string().transform(parseCodeQualite), // 9

    // DG          : durée de gel sous abri (T ≤ 0°C) (en mn)
    DG: z.string().transform(parsePositiveInteger), // 3
    QDG: z.string().transform(parseCodeQualite), // 9

    // FFM         : moyenne quotidienne de la force du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FFM: z.string().transform(parsePositiveFloat), // 1.1
    QFFM: z.string().transform(parseCodeQualite), // 9

    // FF2M        : moyenne quotidienne de la force du vent moyenné sur 10 mn, à 2 m (en m/s et 1/10)
    FF2M: z.string().transform(parsePositiveFloat), // 1.1
    QFF2M: z.string().transform(parseCodeQualite), // 9

    // FXY         : maximum quotidien de la force maximale horaire du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FXY: z.string().transform(parsePositiveFloat), // 1.1
    QFXY: z.string().transform(parseCodeQualite), // 9

    // DXY         : direction de FXY (en rose de 360)
    DXY: z.string().transform(parseWindDirection), // 359
    QDXY: z.string().transform(parseCodeQualite), // 9

    // HXY         : heure de FXY (hhmm)
    HXY: z.string().transform(parseTime), // 1230
    QHXY: z.string().transform(parseCodeQualite), // 9

    // FXI         : maximum quotidien de la force maximale horaire du vent instantané, à 10 m (en m/s et 1/10)
    FXI: z.string().transform(parsePositiveFloat), // 1.1
    QFXI: z.string().transform(parseCodeQualite), // 9

    // DXI         : direction de FXI (en rose de 360)
    DXI: z.string().transform(parseWindDirection), // 359
    QDXI: z.string().transform(parseCodeQualite), // 9

    // HXI         : heure de FXI (hhmm)
    HXI: z.string().transform(parseTime), // 1230
    QHXI: z.string().transform(parseCodeQualite), // 9

    // FXI2        : maximum quotidien de la force maximale horaire du vent instantané, à 2 m (en m/s et 1/10)
    FXI2: z.string().transform(parsePositiveFloat), // 1.1
    QFXI2: z.string().transform(parseCodeQualite), // 9

    // DXI2        : direction de FXI2 (en rose de 360)
    DXI2: z.string().transform(parseWindDirection), // 359
    QDXI2: z.string().transform(parseCodeQualite), // 9

    // HXI2        : heure de FXI2 (hhmm)
    HXI2: z.string().transform(parseTime), // 1230
    QHXI2: z.string().transform(parseCodeQualite), // 9

    // FXI3S       : maximum quotidien de la force maximale horaire du vent moyenné sur 3 s, à 10 m (en m/s et 1/10)
    FXI3S: z.string().transform(parsePositiveFloat), // 1.1
    QFXI3S: z.string().transform(parseCodeQualite), // 9

    // DXI3S       : direction de FXI3S (en rose de 360)
    DXI3S: z.string().transform(parseWindDirection), // 359
    QDXI3S: z.string().transform(parseCodeQualite), // 9

    // HXI3S       : heure de FXI3S (hhmm)
    HXI3S: z.string().transform(parseTime), // 1230
    QHXI3S: z.string().transform(parseCodeQualite), // 9

    // DRR         : durée des précipitations (en mn)
    DRR: z.string().transform(parsePositiveInteger), // 3
    QDRR: z.string().transform(parseCodeQualite), // 9
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

export async function* parseCSV(lines: AsyncGenerator<string>): AsyncGenerator<QuotidienneLine> {
    const headers = await lines.next();
    const headersNameToIndex = parseHeaders(headers.value as string);
    for await (const line of lines) {
        if (line.trim()) {
            yield parseLine(line, headersNameToIndex);
        }
    }
}
