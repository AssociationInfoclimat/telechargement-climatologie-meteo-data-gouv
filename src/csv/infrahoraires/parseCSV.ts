import { parseCSV } from '@/csv/parseCSV.js';
import {
    AltitudeSchema,
    CodeQualiteSchema,
    LatitudeSchema,
    LongitudeSchema,
    NomUsuelSchema,
    NumeroPosteSchema,
    ParseError,
    PositiveFloatSchema,
} from '@/csv/parseCSVUtils.js';
import { createTransform } from '@/lib/createTransform.js';
import { Result } from '@/lib/resultUtils.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    const mn = date.slice('YYYYMMDDHH'.length, 'YYYYMMDDHHMN'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:${mn}:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

const infrahoraireLineSchema = z.object({
    NUM_POSTE: NumeroPosteSchema,
    NOM_USUEL: NomUsuelSchema,
    LAT: LatitudeSchema,
    LON: LongitudeSchema,
    ALTI: AltitudeSchema,
    AAAAMMJJHHMN: DateSchema,
    RR: PositiveFloatSchema,
    QRR: CodeQualiteSchema,
});
export type InfrahoraireLine = ReturnType<typeof infrahoraireLineSchema.parse>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(infrahoraireLineSchema.shape).map(key => [key, z.number()]))
);
export type InfrahoraireHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): InfrahoraireHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: InfrahoraireHeaders): InfrahoraireLine {
    const values = line.split(';').map(value => value.trim());
    return infrahoraireLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseInfrahoraireCSV(
    lines: AsyncGenerator<string>
): AsyncGenerator<Result<InfrahoraireLine, ParseError<unknown>>> {
    return parseCSV<InfrahoraireHeaders, InfrahoraireLine>(lines, { parseHeaders, parseLine });
}

export function createReadingLineDebugMessage(line: InfrahoraireLine): string {
    return `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJHHMN.toISOString()}`;
}
