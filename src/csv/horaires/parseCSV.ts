import { CodeSynop } from '@/csv/horaires/value-objects/CodeSynop.js';
import { CodeTemps } from '@/csv/horaires/value-objects/CodeTemps.js';
import { Etat } from '@/csv/horaires/value-objects/Etat.js';
import { HouleDirection } from '@/csv/horaires/value-objects/HouleDirection.js';
import { Visibility } from '@/csv/horaires/value-objects/Visibility.js';
import {
    parseCodeQualite,
    parseFloatOrNull,
    parseInteger,
    parseOcta,
    parsePercentage,
    parsePositiveFloat,
    parsePositiveInteger,
    parseTime,
    parseUVIndex,
    parseWindDirection,
} from '@/csv/parseCSVUtils.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:00:00Z`);
}

export function parseCodeSynop(value: string): CodeSynop {
    return CodeSynop.of(value);
}

export function parseCodeTemps(value: string): CodeTemps {
    return CodeTemps.of(value);
}

export function parseEtat(value: string): Etat {
    return Etat.of(parsePositiveInteger(value));
}

export function parseVisibility(value: string): Visibility {
    return Visibility.of(parsePositiveInteger(value));
}

export function parseHouleDirection(value: string): HouleDirection {
    return HouleDirection.of(parsePositiveInteger(value));
}

const horaireLineSchema = z.object({
    NUM_POSTE: z.string().transform(NumeroPoste.of),
    NOM_USUEL: z.string(),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(parseInteger),
    AAAAMMJJHH: z.string().transform(parseDate),
    RR1: z.string().transform(parsePositiveFloat), // 3.3
    QRR1: z.string().transform(parseCodeQualite), // 0
    DRR1: z.string().transform(parsePositiveInteger), // 4
    QDRR1: z.string().transform(parseCodeQualite), // 1
    FF: z.string().transform(parsePositiveFloat), // 3.3
    QFF: z.string().transform(parseCodeQualite), // 2
    DD: z.string().transform(parseWindDirection), // 359
    QDD: z.string().transform(parseCodeQualite), // 9
    FXY: z.string().transform(parsePositiveFloat), // 3.3
    QFXY: z.string().transform(parseCodeQualite), // 0
    DXY: z.string().transform(parseWindDirection), // 359
    QDXY: z.string().transform(parseCodeQualite), // 1
    HXY: z.string().transform(parseTime), // 1230
    QHXY: z.string().transform(parseCodeQualite), // 2
    FXI: z.string().transform(parsePositiveFloat), // 3.3
    QFXI: z.string().transform(parseCodeQualite), // 9
    DXI: z.string().transform(parseWindDirection), // 359
    QDXI: z.string().transform(parseCodeQualite), // 0
    HXI: z.string().transform(parseTime), // 1230
    QHXI: z.string().transform(parseCodeQualite), // 1
    FF2: z.string().transform(parsePositiveFloat), // 3.3
    QFF2: z.string().transform(parseCodeQualite), // 2
    DD2: z.string().transform(parseWindDirection), // 359
    QDD2: z.string().transform(parseCodeQualite), // 9
    FXI2: z.string().transform(parsePositiveFloat), // 3.3
    QFXI2: z.string().transform(parseCodeQualite), // 0
    DXI2: z.string().transform(parseWindDirection), // 359
    QDXI2: z.string().transform(parseCodeQualite), // 1
    HXI2: z.string().transform(parseTime), // 1230
    QHXI2: z.string().transform(parseCodeQualite), // 2
    FXI3S: z.string().transform(parsePositiveFloat), // 3.3
    QFXI3S: z.string().transform(parseCodeQualite), // 9
    DXI3S: z.string().transform(parseWindDirection), // 359
    QDXI3S: z.string().transform(parseCodeQualite), // 0
    HFXI3S: z.string().transform(parseTime), // 1230
    QHFXI3S: z.string().transform(parseCodeQualite), // 1
    T: z.string().transform(parseFloatOrNull), // -5.5
    QT: z.string().transform(parseCodeQualite), // 2
    TD: z.string().transform(parseFloatOrNull), // -5.5
    QTD: z.string().transform(parseCodeQualite), // 9
    TN: z.string().transform(parseFloatOrNull), // -5.5
    QTN: z.string().transform(parseCodeQualite), // 0
    HTN: z.string().transform(parseTime), // 1230
    QHTN: z.string().transform(parseCodeQualite), // 1
    TX: z.string().transform(parseFloatOrNull), // -5.5
    QTX: z.string().transform(parseCodeQualite), // 2
    HTX: z.string().transform(parseTime), // 1230
    QHTX: z.string().transform(parseCodeQualite), // 9
    DG: z.string().transform(parsePositiveInteger), // 4
    QDG: z.string().transform(parseCodeQualite), // 0
    T10: z.string().transform(parseFloatOrNull), // -5.5
    QT10: z.string().transform(parseCodeQualite), // 1
    T20: z.string().transform(parseFloatOrNull), // -5.5
    QT20: z.string().transform(parseCodeQualite), // 2
    T50: z.string().transform(parseFloatOrNull), // -5.5
    QT50: z.string().transform(parseCodeQualite), // 9
    T100: z.string().transform(parseFloatOrNull), // -5.5
    QT100: z.string().transform(parseCodeQualite), // 0
    TNSOL: z.string().transform(parseFloatOrNull), // -5.5
    QTNSOL: z.string().transform(parseCodeQualite), // 1
    TN50: z.string().transform(parseFloatOrNull), // -5.5
    QTN50: z.string().transform(parseCodeQualite), // 2
    TCHAUSSEE: z.string().transform(parseFloatOrNull), // -5.5
    QTCHAUSSEE: z.string().transform(parseCodeQualite), // 9
    DHUMEC: z.string().transform(parsePositiveInteger), // 4
    QDHUMEC: z.string().transform(parseCodeQualite), // 0
    U: z.string().transform(parsePercentage), // 100
    QU: z.string().transform(parseCodeQualite), // 1
    UN: z.string().transform(parsePercentage), // 100
    QUN: z.string().transform(parseCodeQualite), // 2
    HUN: z.string().transform(parseTime), // 1230
    QHUN: z.string().transform(parseCodeQualite), // 9
    UX: z.string().transform(parsePercentage), // 100
    QUX: z.string().transform(parseCodeQualite), // 0
    HUX: z.string().transform(parseTime), // 1230
    QHUX: z.string().transform(parseCodeQualite), // 1
    DHUMI40: z.string().transform(parsePositiveInteger), // 4
    QDHUMI40: z.string().transform(parseCodeQualite), // 2
    DHUMI80: z.string().transform(parsePositiveInteger), // 4
    QDHUMI80: z.string().transform(parseCodeQualite), // 9
    TSV: z.string().transform(parsePositiveFloat), // 3.3
    QTSV: z.string().transform(parseCodeQualite), // 0
    PMER: z.string().transform(parsePositiveFloat), // 3.3
    QPMER: z.string().transform(parseCodeQualite), // 1
    PSTAT: z.string().transform(parsePositiveFloat), // 3.3
    QPSTAT: z.string().transform(parseCodeQualite), // 2
    PMERMIN: z.string().transform(parsePositiveFloat), // 3.3
    QPERMIN: z.string().transform(parseCodeQualite), // 9
    GEOP: z.string().transform(parsePositiveInteger), // 4
    QGEOP: z.string().transform(parseCodeQualite), // 0
    N: z.string().transform(parseOcta), // 8
    QN: z.string().transform(parseCodeQualite), // 1
    NBAS: z.string().transform(parseOcta), // 8
    QNBAS: z.string().transform(parseCodeQualite), // 2
    CL: z.string().transform(parseCodeSynop), // /
    QCL: z.string().transform(parseCodeQualite), // 9
    CM: z.string().transform(parseCodeSynop), // /
    QCM: z.string().transform(parseCodeQualite), // 0
    CH: z.string().transform(parseCodeSynop), // /
    QCH: z.string().transform(parseCodeQualite), // 1
    N1: z.string().transform(parseOcta), // 8
    QN1: z.string().transform(parseCodeQualite), // 2
    C1: z.string().transform(parseCodeSynop), // /
    QC1: z.string().transform(parseCodeQualite), // 9
    B1: z.string().transform(parsePositiveInteger), // 4
    QB1: z.string().transform(parseCodeQualite), // 0
    N2: z.string().transform(parseOcta), // 8
    QN2: z.string().transform(parseCodeQualite), // 1
    C2: z.string().transform(parseCodeSynop), // /
    QC2: z.string().transform(parseCodeQualite), // 2
    B2: z.string().transform(parsePositiveInteger), // 4
    QCB2: z.string().transform(parseCodeQualite), // 9
    N3: z.string().transform(parseOcta), // 8
    QN3: z.string().transform(parseCodeQualite), // 0
    C3: z.string().transform(parseCodeSynop), // /
    QC3: z.string().transform(parseCodeQualite), // 1
    B3: z.string().transform(parsePositiveInteger), // 4
    QB3: z.string().transform(parseCodeQualite), // 2
    N4: z.string().transform(parseOcta), // 8
    QN4: z.string().transform(parseCodeQualite), // 9
    C4: z.string().transform(parseCodeSynop), // /
    QC4: z.string().transform(parseCodeQualite), // 0
    B4: z.string().transform(parsePositiveInteger), // 4
    QB4: z.string().transform(parseCodeQualite), // 1
    VV: z.string().transform(parsePositiveInteger), // 4
    QVV: z.string().transform(parseCodeQualite), // 2
    DVV200: z.string().transform(parsePositiveInteger), // 4
    QDVV200: z.string().transform(parseCodeQualite), // 9
    WW: z.string().transform(parseCodeTemps), // 99
    QWW: z.string().transform(parseCodeQualite), // 0
    W1: z.string().transform(parseCodeTemps), // 99
    QW1: z.string().transform(parseCodeQualite), // 1
    W2: z.string().transform(parseCodeTemps), // 99
    QW2: z.string().transform(parseCodeQualite), // 2
    SOL: z.string().transform(parseEtat), // 7
    QSOL: z.string().transform(parseCodeQualite), // 9
    SOLNG: z.string().transform(parseEtat), // 7
    QSOLNG: z.string().transform(parseCodeQualite), // 0
    TMER: z.string().transform(parseFloatOrNull), // -5.5
    QTMER: z.string().transform(parseCodeQualite), // 1
    VVMER: z.string().transform(parseVisibility), // 6
    QVVMER: z.string().transform(parseCodeQualite), // 2
    ETATMER: z.string().transform(parseEtat), // 7
    QETATMER: z.string().transform(parseCodeQualite), // 9
    DIRHOULE: z.string().transform(parseHouleDirection), // 999
    QDIRHOULE: z.string().transform(parseCodeQualite), // 0
    HVAGUE: z.string().transform(parsePositiveFloat), // 3.3
    QHVAGUE: z.string().transform(parseCodeQualite), // 1
    PVAGUE: z.string().transform(parsePositiveFloat), // 3.3
    QPVAGUE: z.string().transform(parseCodeQualite), // 2
    HNEIGEF: z.string().transform(parsePositiveInteger), // 4
    QHNEIGEF: z.string().transform(parseCodeQualite), // 9
    NEIGETOT: z.string().transform(parsePositiveInteger), // 4
    QNEIGETOT: z.string().transform(parseCodeQualite), // 0
    TSNEIGE: z.string().transform(parsePositiveFloat), // 3.3
    QTSNEIGE: z.string().transform(parseCodeQualite), // 1
    TUBENEIGE: z.string().transform(parsePositiveInteger), // 4
    QTUBENEIGE: z.string().transform(parseCodeQualite), // 2
    HNEIGEFI3: z.string().transform(parsePositiveInteger), // 4
    QHNEIGEFI3: z.string().transform(parseCodeQualite), // 9
    HNEIGEFI1: z.string().transform(parsePositiveInteger), // 4
    QHNEIGEFI1: z.string().transform(parseCodeQualite), // 0
    ESNEIGE: z.string().transform(parseEtat), // 7
    QESNEIGE: z.string().transform(parseCodeQualite), // 1
    CHARGENEIGE: z.string().transform(parsePositiveInteger), // 4
    QCHARGENEIGE: z.string().transform(parseCodeQualite), // 2
    GLO: z.string().transform(parsePositiveInteger), // 4
    QGLO: z.string().transform(parseCodeQualite), // 9
    GLO2: z.string().transform(parsePositiveInteger), // 4
    QGLO2: z.string().transform(parseCodeQualite), // 0
    DIR: z.string().transform(parsePositiveInteger), // 4
    QDIR: z.string().transform(parseCodeQualite), // 1
    DIR2: z.string().transform(parsePositiveInteger), // 4
    QDIR2: z.string().transform(parseCodeQualite), // 2
    DIF: z.string().transform(parsePositiveInteger), // 4
    QDIF: z.string().transform(parseCodeQualite), // 9
    DIF2: z.string().transform(parsePositiveInteger), // 4
    QDIF2: z.string().transform(parseCodeQualite), // 0
    UV: z.string().transform(parsePositiveInteger), // 4
    QUV: z.string().transform(parseCodeQualite), // 1
    UV2: z.string().transform(parsePositiveInteger), // 4
    QUV2: z.string().transform(parseCodeQualite), // 2
    UV_INDICE: z.string().transform(parseUVIndex), // 12
    QUV_INDICE: z.string().transform(parseCodeQualite), // 9
    INFRAR: z.string().transform(parsePositiveInteger), // 4
    QINFRAR: z.string().transform(parseCodeQualite), // 0
    INFRAR2: z.string().transform(parsePositiveInteger), // 4
    QINFRAR2: z.string().transform(parseCodeQualite), // 1
    INS: z.string().transform(parsePositiveInteger), // 4
    QINS: z.string().transform(parseCodeQualite), // 2
    INS2: z.string().transform(parsePositiveInteger), // 4
    QINS2: z.string().transform(parseCodeQualite), // 9
    TLAGON: z.string().transform(parseFloatOrNull), // -5.5
    QTLAGON: z.string().transform(parseCodeQualite), // 0
    TVEGETAUX: z.string().transform(parseFloatOrNull), // -5.5
    QTVEGETAUX: z.string().transform(parseCodeQualite), // 1
    ECOULEMENT: z.string().transform(parseFloatOrNull), // -5.5
    QECOULEMENT: z.string().transform(parseCodeQualite), // 2
});
export type HoraireLine = ReturnType<typeof horaireLineSchema.parse>;

const headersSchema = z.object(Object.fromEntries(Object.keys(horaireLineSchema.shape).map(key => [key, z.number()])));
export type HoraireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): HoraireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: HoraireHeaders): HoraireLine {
    const values = line.split(';').map(value => value.trim());
    return horaireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function* parseCSV(lines: Generator<string>): Generator<HoraireLine> {
    const headersNameToIndex = parseHeaders(lines.next().value as string);
    for (const line of lines) {
        if (line.trim()) {
            yield parseLine(line, headersNameToIndex);
        }
    }
}
