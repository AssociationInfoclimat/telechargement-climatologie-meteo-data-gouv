import { CodeSynop } from '@/csv/horaires/value-objects/CodeSynop.js';
import { CodeTemps } from '@/csv/horaires/value-objects/CodeTemps.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HouleDirection } from '@/csv/horaires/value-objects/HouleDirection.js';
import { Visibility } from '@/csv/horaires/value-objects/Visibility.js';
import { parseCSV } from '@/csv/parseCSV.js';
import {
    onCatch,
    ParseError,
    parsePositiveInteger,
    tmpFixHeader,
    toCodeQualite,
    toFloatOrNull,
    toHumiditeRelative,
    toInteger,
    toNumeroPoste,
    toOcta,
    toPositiveFloat,
    toPositiveInteger,
    toTime,
    toUVIndex,
    toWindDirection,
} from '@/csv/parseCSVUtils.js';
import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { Octa } from '@/data/value-objects/Octa.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { Time } from '@/data/value-objects/Time.js';
import { UVIndex } from '@/data/value-objects/UVIndex.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { createTransform } from '@/lib/createTransform.js';
import { Result } from '@/lib/resultUtils.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:00:00Z`);
}

export const toDate = createTransform(parseDate);

export function parseCodeSynop(value: string): CodeSynop {
    return CodeSynop.of(value);
}

export const toCodeSynop = createTransform(parseCodeSynop);

export function parseCodeTemps(value: string): CodeTemps {
    return CodeTemps.of(value);
}

export const toCodeTemps = createTransform(parseCodeTemps);

export function parseEtat(value: string): Etat {
    return Etat.of(parsePositiveInteger(value));
}

export const toEtat = createTransform(parseEtat);

export function parseVisibility(value: string): Visibility {
    return Visibility.of(parsePositiveInteger(value));
}

export const toVisibility = createTransform(parseVisibility);

export function parseHouleDirection(value: string): HouleDirection {
    return HouleDirection.of(parsePositiveInteger(value));
}

export const toHouleDirection = createTransform(parseHouleDirection);

const horaireLineSchema = z.object({
    NUM_POSTE: z.string().transform(toNumeroPoste),
    NOM_USUEL: z.string(),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(toInteger),
    AAAAMMJJHH: z.string().transform(toDate),
    RR1: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QRR1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    DRR1: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDRR1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    FF: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QFF: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    DD: z
        .string()
        .transform(toWindDirection)
        .catch(ctx => {
            onCatch(ctx);
            return WindDirection.of(PositiveInteger.of(null));
        }), // 360
    QDD: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    FXY: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QFXY: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
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
        }), // 1
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
        }), // 2
    FXI: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QFXI: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
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
        }), // 0
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
        }), // 1
    FF2: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QFF2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    DD2: z
        .string()
        .transform(toWindDirection)
        .catch(ctx => {
            onCatch(ctx);
            return WindDirection.of(PositiveInteger.of(null));
        }), // 360
    QDD2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    FXI2: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QFXI2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
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
        }), // 1
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
        }), // 2
    FXI3S: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QFXI3S: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
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
        }), // 0
    HFXI3S: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHFXI3S: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    T: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QT: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    TD: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTD: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    TN: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
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
        }), // 1
    TX: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTX: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
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
    DG: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDG: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    T10: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QT10: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    T20: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QT20: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    T50: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QT50: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    T100: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QT100: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    TNSOL: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTNSOL: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    TN50: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTN50: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    TCHAUSSEE: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTCHAUSSEE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    DHUMEC: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDHUMEC: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    U: z
        .string()
        .transform(toHumiditeRelative)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 100
    QU: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    UN: z
        .string()
        .transform(toHumiditeRelative)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 100
    QUN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    HUN: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHUN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    UX: z
        .string()
        .transform(toHumiditeRelative)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 100
    QUX: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    HUX: z
        .string()
        .transform(toTime)
        .catch(ctx => {
            onCatch(ctx);
            return Time.of('');
        }), // 1230
    QHUX: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    DHUMI40: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDHUMI40: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    DHUMI80: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDHUMI80: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    TSV: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QTSV: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    PMER: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QPMER: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    PSTAT: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QPSTAT: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    PMERMIN: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QPMERMIN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    GEOP: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QGEOP: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    N: z
        .string()
        .transform(toOcta)
        .catch(ctx => {
            onCatch(ctx);
            return Octa.of(PositiveInteger.of(null));
        }), // 8
    QN: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    NBAS: z
        .string()
        .transform(toOcta)
        .catch(ctx => {
            onCatch(ctx);
            return Octa.of(PositiveInteger.of(null));
        }), // 8
    QNBAS: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    CL: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QCL: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    CM: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QCM: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    CH: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QCH: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    N1: z
        .string()
        .transform(toOcta)
        .catch(ctx => {
            onCatch(ctx);
            return Octa.of(PositiveInteger.of(null));
        }), // 8
    QN1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    C1: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QC1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    B1: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QB1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    N2: z
        .string()
        .transform(toOcta)
        .catch(ctx => {
            onCatch(ctx);
            return Octa.of(PositiveInteger.of(null));
        }), // 8
    QN2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    C2: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QC2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    B2: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QB2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    N3: z
        .string()
        .transform(toOcta)
        .catch(ctx => {
            onCatch(ctx);
            return Octa.of(PositiveInteger.of(null));
        }), // 8
    QN3: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    C3: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QC3: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    B3: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QB3: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    N4: z
        .string()
        .transform(toOcta)
        .catch(ctx => {
            onCatch(ctx);
            return Octa.of(PositiveInteger.of(null));
        }), // 8
    QN4: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    C4: z
        .string()
        .transform(toCodeSynop)
        .catch(ctx => {
            onCatch(ctx);
            return CodeSynop.of('');
        }), // /
    QC4: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    B4: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QB4: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    VV: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QVV: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    DVV200: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDVV200: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    WW: z
        .string()
        .transform(toCodeTemps)
        .catch(ctx => {
            onCatch(ctx);
            return CodeTemps.of('');
        }), // 00
    QWW: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    W1: z
        .string()
        .transform(toCodeTemps)
        .catch(ctx => {
            onCatch(ctx);
            return CodeTemps.of('');
        }), // 00
    QW1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    W2: z
        .string()
        .transform(toCodeTemps)
        .catch(ctx => {
            onCatch(ctx);
            return CodeTemps.of('');
        }), // 00
    QW2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    SOL: z
        .string()
        .transform(toEtat)
        .catch(ctx => {
            onCatch(ctx);
            return Etat.of(PositiveInteger.of(null));
        }), // 7
    QSOL: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    SOLNG: z
        .string()
        .transform(toEtat)
        .catch(ctx => {
            onCatch(ctx);
            return Etat.of(PositiveInteger.of(null));
        }), // 7
    QSOLNG: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    TMER: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTMER: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    VVMER: z
        .string()
        .transform(toVisibility)
        .catch(ctx => {
            onCatch(ctx);
            return Visibility.of(PositiveInteger.of(null));
        }), // 6
    QVVMER: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    ETATMER: z
        .string()
        .transform(toEtat)
        .catch(ctx => {
            onCatch(ctx);
            return Etat.of(PositiveInteger.of(null));
        }), // 7
    QETATMER: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    DIRHOULE: z
        .string()
        .transform(toHouleDirection)
        .catch(ctx => {
            onCatch(ctx);
            return HouleDirection.of(PositiveInteger.of(null));
        }), // 999
    QDIRHOULE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    HVAGUE: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QHVAGUE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    PVAGUE: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QPVAGUE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    HNEIGEF: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QHNEIGEF: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    NEIGETOT: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QNEIGETOT: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    TSNEIGE: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QTSNEIGE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    TUBENEIGE: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QTUBENEIGE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    HNEIGEFI3: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QHNEIGEFI3: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    HNEIGEFI1: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QHNEIGEFI1: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    ESNEIGE: z
        .string()
        .transform(toEtat)
        .catch(ctx => {
            onCatch(ctx);
            return Etat.of(PositiveInteger.of(null));
        }), // 7
    QESNEIGE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    CHARGENEIGE: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QCHARGENEIGE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    GLO: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QGLO: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    GLO2: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QGLO2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    DIR: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDIR: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    DIR2: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDIR2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    DIF: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDIF: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    DIF2: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QDIF2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    UV: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QUV: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    UV2: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 3.3
    QUV2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    UV_INDICE: z
        .string()
        .transform(toUVIndex)
        .catch(ctx => {
            onCatch(ctx);
            return UVIndex.of(PositiveInteger.of(null));
        }), // 12
    QUV_INDICE: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    INFRAR: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QINFRAR: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    INFRAR2: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QINFRAR2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    INS: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QINS: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
    INS2: z
        .string()
        .transform(toPositiveInteger)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }), // 4
    QINS2: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 9
    TLAGON: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTLAGON: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 0
    TVEGETAUX: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QTVEGETAUX: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 1
    ECOULEMENT: z
        .string()
        .transform(toFloatOrNull)
        .catch(ctx => {
            onCatch(ctx);
            return null;
        }), // -5.5
    QECOULEMENT: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }), // 2
});
export type HoraireLine = ReturnType<typeof horaireLineSchema.parse>;

const headersSchema = z.object(Object.fromEntries(Object.keys(horaireLineSchema.shape).map(key => [key, z.number()])));
export type HoraireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): HoraireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [tmpFixHeader(header), index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: HoraireHeaders): HoraireLine {
    const values = line.split(';').map(value => value.trim());
    return horaireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseHoraireCSV(
    lines: AsyncGenerator<string>
): AsyncGenerator<Result<HoraireLine, ParseError<unknown>>> {
    return parseCSV<HoraireHeaders, HoraireLine>(lines, { parseHeaders, parseLine });
}

export function createReadingLineDebugMessage(line: HoraireLine): string {
    return `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHH.toISOString()}`;
}
