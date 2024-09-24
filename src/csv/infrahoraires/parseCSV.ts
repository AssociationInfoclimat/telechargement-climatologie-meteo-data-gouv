import {
    parseCodeQualite,
    parseInteger,
    parseNomUsuel,
    parseNumeroPoste,
    parsePositiveFloat,
} from '@/csv/parseCSVUtils.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    const hh = date.slice('YYYYMMDD'.length, 'YYYYMMDDHH'.length);
    const mn = date.slice('YYYYMMDDHH'.length, 'YYYYMMDDHHMN'.length);
    return new Date(`${yyyy}-${mm}-${dd}T${hh}:${mn}:00Z`);
}

const infrahoraireLineSchema = z.object({
    NUM_POSTE: z.string().transform(parseNumeroPoste),
    NOM_USUEL: z.string().transform(parseNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(parseInteger),
    AAAAMMJJHHMN: z.string().transform(parseDate),
    RR: z.string().transform(parsePositiveFloat),
    QRR: z.string().transform(parseCodeQualite),
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

export async function* parseCSV(lines: AsyncGenerator<string>): AsyncGenerator<InfrahoraireLine> {
    const headers = await lines.next();
    const headersNameToIndex = parseHeaders(headers.value as string);
    for await (const line of lines) {
        if (line.trim()) {
            yield parseLine(line, headersNameToIndex);
        }
    }
}
