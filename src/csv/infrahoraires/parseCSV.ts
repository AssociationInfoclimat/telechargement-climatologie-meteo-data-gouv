import { parseCSV } from '@/csv/parseCSV.js';
import {
    onCatch,
    ParseError,
    toCodeQualite,
    toInteger,
    toNomUsuel,
    toNumeroPoste,
    toPositiveFloat,
} from '@/csv/parseCSVUtils.js';
import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
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

const infrahoraireLineSchema = z.object({
    NUM_POSTE: z.string().transform(toNumeroPoste),
    NOM_USUEL: z.string().transform(toNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(toInteger),
    AAAAMMJJHHMN: z.string().transform(toDate),
    RR: z
        .string()
        .transform(toPositiveFloat)
        .catch(ctx => {
            onCatch(ctx);
            return PositiveFloat.of(null);
        }),
    QRR: z
        .string()
        .transform(toCodeQualite)
        .catch(ctx => {
            onCatch(ctx);
            return CodeQualite.of(PositiveInteger.of(null));
        }),
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
