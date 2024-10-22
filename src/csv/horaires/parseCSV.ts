import { CodeSynop } from '@/csv/horaires/value-objects/CodeSynop.js';
import { CodeTemps } from '@/csv/horaires/value-objects/CodeTemps.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HouleDirection } from '@/csv/horaires/value-objects/HouleDirection.js';
import { Visibility } from '@/csv/horaires/value-objects/Visibility.js';
import { parseCSV } from '@/csv/parseCSV.js';
import {
    AltitudeSchema,
    CodeQualiteSchema,
    FloatOrNullSchema,
    HumiditeRelativeSchema,
    LatitudeSchema,
    LongitudeSchema,
    NomUsuelSchema,
    NumeroPosteSchema,
    OctaSchema,
    onCatch,
    ParseError,
    parsePositiveInteger,
    PositiveFloatSchema,
    PositiveIntegerSchema,
    TimeSchema,
    tmpFixHeader,
    UVIndexSchema,
    WindDirectionSchema,
} from '@/csv/parseCSVUtils.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
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
export const DateSchema = z.string().transform(toDate);

export function parseCodeSynop(value: string): CodeSynop {
    return CodeSynop.of(value);
}

export const toCodeSynop = createTransform(parseCodeSynop);
export const CodeSynopSchema = z
    .string()
    .transform(toCodeSynop)
    .catch(ctx => {
        onCatch(ctx);
        return CodeSynop.of('');
    });

export function parseCodeTemps(value: string): CodeTemps {
    return CodeTemps.of(value);
}

export const toCodeTemps = createTransform(parseCodeTemps);
export const CodeTempsSchema = z
    .string()
    .transform(toCodeTemps)
    .catch(ctx => {
        onCatch(ctx);
        return CodeTemps.of('');
    });

export function parseEtat(value: string): Etat {
    return Etat.of(parsePositiveInteger(value));
}

export const toEtat = createTransform(parseEtat);
export const EtatSchema = z
    .string()
    .transform(toEtat)
    .catch(ctx => {
        onCatch(ctx);
        return Etat.of(PositiveInteger.of(null));
    });

export function parseVisibility(value: string): Visibility {
    return Visibility.of(parsePositiveInteger(value));
}

export const toVisibility = createTransform(parseVisibility);
export const VisibilitySchema = z
    .string()
    .transform(toVisibility)
    .catch(ctx => {
        onCatch(ctx);
        return Visibility.of(PositiveInteger.of(null));
    });

export function parseHouleDirection(value: string): HouleDirection {
    return HouleDirection.of(parsePositiveInteger(value));
}

export const toHouleDirection = createTransform(parseHouleDirection);
export const HouleDirectionSchema = z
    .string()
    .transform(toHouleDirection)
    .catch(ctx => {
        onCatch(ctx);
        return HouleDirection.of(PositiveInteger.of(null));
    });

const horaireLineSchema = z.object({
    NUM_POSTE: NumeroPosteSchema,
    NOM_USUEL: NomUsuelSchema,
    LAT: LatitudeSchema,
    LON: LongitudeSchema,
    ALTI: AltitudeSchema,
    AAAAMMJJHH: DateSchema,
    RR1: PositiveFloatSchema, // 3.3
    QRR1: CodeQualiteSchema, // 0
    DRR1: PositiveIntegerSchema, // 4
    QDRR1: CodeQualiteSchema, // 1
    FF: PositiveFloatSchema, // 3.3
    QFF: CodeQualiteSchema, // 2
    DD: WindDirectionSchema, // 360
    QDD: CodeQualiteSchema, // 9
    FXY: PositiveFloatSchema, // 3.3
    QFXY: CodeQualiteSchema, // 0
    DXY: WindDirectionSchema, // 360
    QDXY: CodeQualiteSchema, // 1
    HXY: TimeSchema, // 1230
    QHXY: CodeQualiteSchema, // 2
    FXI: PositiveFloatSchema, // 3.3
    QFXI: CodeQualiteSchema, // 9
    DXI: WindDirectionSchema, // 360
    QDXI: CodeQualiteSchema, // 0
    HXI: TimeSchema, // 1230
    QHXI: CodeQualiteSchema, // 1
    FF2: PositiveFloatSchema, // 3.3
    QFF2: CodeQualiteSchema, // 2
    DD2: WindDirectionSchema, // 360
    QDD2: CodeQualiteSchema, // 9
    FXI2: PositiveFloatSchema, // 3.3
    QFXI2: CodeQualiteSchema, // 0
    DXI2: WindDirectionSchema, // 360
    QDXI2: CodeQualiteSchema, // 1
    HXI2: TimeSchema, // 1230
    QHXI2: CodeQualiteSchema, // 2
    FXI3S: PositiveFloatSchema, // 3.3
    QFXI3S: CodeQualiteSchema, // 9
    DXI3S: WindDirectionSchema, // 360
    QDXI3S: CodeQualiteSchema, // 0
    HFXI3S: TimeSchema, // 1230
    QHFXI3S: CodeQualiteSchema, // 1
    T: FloatOrNullSchema, // -5.5
    QT: CodeQualiteSchema, // 2
    TD: FloatOrNullSchema, // -5.5
    QTD: CodeQualiteSchema, // 9
    TN: FloatOrNullSchema, // -5.5
    QTN: CodeQualiteSchema, // 0
    HTN: TimeSchema, // 1230
    QHTN: CodeQualiteSchema, // 1
    TX: FloatOrNullSchema, // -5.5
    QTX: CodeQualiteSchema, // 2
    HTX: TimeSchema, // 1230
    QHTX: CodeQualiteSchema, // 9
    DG: PositiveIntegerSchema, // 4
    QDG: CodeQualiteSchema, // 0
    T10: FloatOrNullSchema, // -5.5
    QT10: CodeQualiteSchema, // 1
    T20: FloatOrNullSchema, // -5.5
    QT20: CodeQualiteSchema, // 2
    T50: FloatOrNullSchema, // -5.5
    QT50: CodeQualiteSchema, // 9
    T100: FloatOrNullSchema, // -5.5
    QT100: CodeQualiteSchema, // 0
    TNSOL: FloatOrNullSchema, // -5.5
    QTNSOL: CodeQualiteSchema, // 1
    TN50: FloatOrNullSchema, // -5.5
    QTN50: CodeQualiteSchema, // 2
    TCHAUSSEE: FloatOrNullSchema, // -5.5
    QTCHAUSSEE: CodeQualiteSchema, // 9
    DHUMEC: PositiveIntegerSchema, // 4
    QDHUMEC: CodeQualiteSchema, // 0
    U: HumiditeRelativeSchema, // 100
    QU: CodeQualiteSchema, // 1
    UN: HumiditeRelativeSchema, // 100
    QUN: CodeQualiteSchema, // 2
    HUN: TimeSchema, // 1230
    QHUN: CodeQualiteSchema, // 9
    UX: HumiditeRelativeSchema, // 100
    QUX: CodeQualiteSchema, // 0
    HUX: TimeSchema, // 1230
    QHUX: CodeQualiteSchema, // 1
    DHUMI40: PositiveIntegerSchema, // 4
    QDHUMI40: CodeQualiteSchema, // 2
    DHUMI80: PositiveIntegerSchema, // 4
    QDHUMI80: CodeQualiteSchema, // 9
    TSV: PositiveFloatSchema, // 3.3
    QTSV: CodeQualiteSchema, // 0
    PMER: PositiveFloatSchema, // 3.3
    QPMER: CodeQualiteSchema, // 1
    PSTAT: PositiveFloatSchema, // 3.3
    QPSTAT: CodeQualiteSchema, // 2
    PMERMIN: PositiveFloatSchema, // 3.3
    QPMERMIN: CodeQualiteSchema, // 9
    GEOP: PositiveIntegerSchema, // 4
    QGEOP: CodeQualiteSchema, // 0
    N: OctaSchema, // 8
    QN: CodeQualiteSchema, // 1
    NBAS: OctaSchema, // 8
    QNBAS: CodeQualiteSchema, // 2
    CL: CodeSynopSchema, // /
    QCL: CodeQualiteSchema, // 9
    CM: CodeSynopSchema, // /
    QCM: CodeQualiteSchema, // 0
    CH: CodeSynopSchema, // /
    QCH: CodeQualiteSchema, // 1
    N1: OctaSchema, // 8
    QN1: CodeQualiteSchema, // 2
    C1: CodeSynopSchema, // /
    QC1: CodeQualiteSchema, // 9
    B1: PositiveIntegerSchema, // 4
    QB1: CodeQualiteSchema, // 0
    N2: OctaSchema, // 8
    QN2: CodeQualiteSchema, // 1
    C2: CodeSynopSchema, // /
    QC2: CodeQualiteSchema, // 2
    B2: PositiveIntegerSchema, // 4
    QB2: CodeQualiteSchema, // 9
    N3: OctaSchema, // 8
    QN3: CodeQualiteSchema, // 0
    C3: CodeSynopSchema, // /
    QC3: CodeQualiteSchema, // 1
    B3: PositiveIntegerSchema, // 4
    QB3: CodeQualiteSchema, // 2
    N4: OctaSchema, // 8
    QN4: CodeQualiteSchema, // 9
    C4: CodeSynopSchema, // /
    QC4: CodeQualiteSchema, // 0
    B4: PositiveIntegerSchema, // 4
    QB4: CodeQualiteSchema, // 1
    VV: PositiveIntegerSchema, // 4
    QVV: CodeQualiteSchema, // 2
    DVV200: PositiveIntegerSchema, // 4
    QDVV200: CodeQualiteSchema, // 9
    WW: CodeTempsSchema, // 00
    QWW: CodeQualiteSchema, // 0
    W1: CodeTempsSchema, // 00
    QW1: CodeQualiteSchema, // 1
    W2: CodeTempsSchema, // 00
    QW2: CodeQualiteSchema, // 2
    SOL: EtatSchema, // 7
    QSOL: CodeQualiteSchema, // 9
    SOLNG: EtatSchema, // 7
    QSOLNG: CodeQualiteSchema, // 0
    TMER: FloatOrNullSchema, // -5.5
    QTMER: CodeQualiteSchema, // 1
    VVMER: VisibilitySchema, // 6
    QVVMER: CodeQualiteSchema, // 2
    ETATMER: EtatSchema, // 7
    QETATMER: CodeQualiteSchema, // 9
    DIRHOULE: HouleDirectionSchema, // 999
    QDIRHOULE: CodeQualiteSchema, // 0
    HVAGUE: PositiveFloatSchema, // 3.3
    QHVAGUE: CodeQualiteSchema, // 1
    PVAGUE: PositiveFloatSchema, // 3.3
    QPVAGUE: CodeQualiteSchema, // 2
    HNEIGEF: PositiveIntegerSchema, // 4
    QHNEIGEF: CodeQualiteSchema, // 9
    NEIGETOT: PositiveIntegerSchema, // 4
    QNEIGETOT: CodeQualiteSchema, // 0
    TSNEIGE: PositiveFloatSchema, // 3.3
    QTSNEIGE: CodeQualiteSchema, // 1
    TUBENEIGE: PositiveIntegerSchema, // 4
    QTUBENEIGE: CodeQualiteSchema, // 2
    HNEIGEFI3: PositiveIntegerSchema, // 4
    QHNEIGEFI3: CodeQualiteSchema, // 9
    HNEIGEFI1: PositiveIntegerSchema, // 4
    QHNEIGEFI1: CodeQualiteSchema, // 0
    ESNEIGE: EtatSchema, // 7
    QESNEIGE: CodeQualiteSchema, // 1
    CHARGENEIGE: PositiveIntegerSchema, // 4
    QCHARGENEIGE: CodeQualiteSchema, // 2
    GLO: PositiveIntegerSchema, // 4
    QGLO: CodeQualiteSchema, // 9
    GLO2: PositiveIntegerSchema, // 4
    QGLO2: CodeQualiteSchema, // 0
    DIR: PositiveIntegerSchema, // 4
    QDIR: CodeQualiteSchema, // 1
    DIR2: PositiveIntegerSchema, // 4
    QDIR2: CodeQualiteSchema, // 2
    DIF: PositiveIntegerSchema, // 4
    QDIF: CodeQualiteSchema, // 9
    DIF2: PositiveIntegerSchema, // 4
    QDIF2: CodeQualiteSchema, // 0
    UV: PositiveFloatSchema, // 3.3
    QUV: CodeQualiteSchema, // 1
    UV2: PositiveFloatSchema, // 3.3
    QUV2: CodeQualiteSchema, // 2
    UV_INDICE: UVIndexSchema, // 12
    QUV_INDICE: CodeQualiteSchema, // 9
    INFRAR: PositiveIntegerSchema, // 4
    QINFRAR: CodeQualiteSchema, // 0
    INFRAR2: PositiveIntegerSchema, // 4
    QINFRAR2: CodeQualiteSchema, // 1
    INS: PositiveIntegerSchema, // 4
    QINS: CodeQualiteSchema, // 2
    INS2: PositiveIntegerSchema, // 4
    QINS2: CodeQualiteSchema, // 9
    TLAGON: FloatOrNullSchema, // -5.5
    QTLAGON: CodeQualiteSchema, // 0
    TVEGETAUX: FloatOrNullSchema, // -5.5
    QTVEGETAUX: CodeQualiteSchema, // 1
    ECOULEMENT: FloatOrNullSchema, // -5.5
    QECOULEMENT: CodeQualiteSchema, // 2
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
