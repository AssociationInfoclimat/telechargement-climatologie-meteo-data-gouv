import { AngstromCodeCalcul, CodeCalcul } from '@/csv/decadaires-agro/value-objects/CodeCalcul.js';
import { parseCSV } from '@/csv/parseCSV.js';
import {
    ParseError,
    parsePositiveInteger,
    toDecade,
    toFloatOrNull,
    toInteger,
    toNomUsuel,
    toNumeroPoste,
    toPositiveFloat,
    toPositiveInteger,
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

export function parseCodeCalcul(code: string): CodeCalcul {
    return CodeCalcul.of(parsePositiveInteger(code));
}

export const toCodeCalcul = createTransform(parseCodeCalcul);

export function parseAngstromCodeCalcul(code: string): AngstromCodeCalcul {
    return AngstromCodeCalcul.of(parsePositiveInteger(code));
}

export const toAngstromCodeCalcul = createTransform(parseAngstromCodeCalcul);

const decadaireAgroLineSchema = z.object({
    NUM_POSTE: z.string().transform(toNumeroPoste),
    NOM_USUEL: z.string().transform(toNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(toInteger),
    AAAAMM: z.string().transform(toDate),
    NUM_DECADE: z.string().transform(toDecade),
    // RR         : cumul décadaire des hauteurs de précipitation (en mm et 1/10)
    RR: z.string().transform(toPositiveFloat), // 1.1
    // CRR        : code calcul de RR pour la décade
    CRR: z.string().transform(toCodeCalcul), // 0
    // TN         : moyenne décadaire de la température minimale (en °C et 1/10)
    TN: z.string().transform(toFloatOrNull), // -3.3
    // CTN        : code calcul de TN pour la décade
    CTN: z.string().transform(toCodeCalcul), // 0
    // TX         : moyenne décadaire de la température maximale (en °C et 1/10)
    TX: z.string().transform(toFloatOrNull), // -3.3
    // CTX        : code calcul de TX pour la décade
    CTX: z.string().transform(toCodeCalcul), // 0
    // FFM        : moyenne décadaire de la force du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FFM: z.string().transform(toPositiveFloat), // 1.1
    // CFFM       : code calcul de FFM pour la décade
    CFFM: z.string().transform(toCodeCalcul), // 0
    // TSVM       : moyenne décadaire de la tension de vapeur (en hPa et 1/10)
    TSVM: z.string().transform(toPositiveFloat), // 1.1
    // CTSVM      : code calcul de TSVM pour la décade
    CTSVM: z.string().transform(toCodeCalcul), // 0
    // INST       : durée totale d’insolation sur la décade (en mn)
    INST: z.string().transform(toPositiveInteger), // 4
    // CINST      : code calcul de l’insolation pour la décade
    CINST: z.string().transform(toAngstromCodeCalcul), // 2
    // GLOT       : cumul de rayonnement global (en J/cm2)
    GLOT: z.string().transform(toPositiveInteger), // 4
    // CGLOT      : code calcul de rayonnement pour la décade
    CGLOT: z.string().transform(toAngstromCodeCalcul), // 2
    // ETP        : ETP Penman décadaire (en mm et 1/10)
    ETP: z.string().transform(toPositiveFloat), // 1.1
});
export type DecadaireAgroLine = z.infer<typeof decadaireAgroLineSchema>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(decadaireAgroLineSchema.shape).map(key => [key, z.number()]))
);
export type DecadaireAgroHeaders = ReturnType<typeof headersSchema.parse>;

export function parseHeaders(line: string): DecadaireAgroHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(line: string, headersNameToIndex: DecadaireAgroHeaders): DecadaireAgroLine {
    const values = line.split(';').map(value => value.trim());
    return decadaireAgroLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export function parseDecadaireAgroCSV(
    lines: AsyncGenerator<string>
): AsyncGenerator<Result<DecadaireAgroLine, ParseError<unknown>>> {
    return parseCSV<DecadaireAgroHeaders, DecadaireAgroLine>(lines, { parseHeaders, parseLine });
}

export function createReadingLineDebugMessage(line: DecadaireAgroLine): string {
    return `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMM.toISOString()}-${line.NUM_DECADE}`;
}
