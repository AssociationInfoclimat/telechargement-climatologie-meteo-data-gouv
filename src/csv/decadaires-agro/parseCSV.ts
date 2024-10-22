import { AngstromCodeCalcul, CodeCalcul } from '@/csv/decadaires-agro/value-objects/CodeCalcul.js';
import { parseCSV } from '@/csv/parseCSV.js';
import {
    AltitudeSchema,
    DecadeSchema,
    FloatOrNullSchema,
    LatitudeSchema,
    LongitudeSchema,
    NomUsuelSchema,
    NumeroPosteSchema,
    onCatch,
    ParseError,
    parsePositiveInteger,
    PositiveFloatSchema,
    PositiveIntegerSchema,
} from '@/csv/parseCSVUtils.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { createTransform } from '@/lib/createTransform.js';
import { Result } from '@/lib/resultUtils.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    return new Date(`${yyyy}-${mm}-01T00:00:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);

export function parseCodeCalcul(code: string): CodeCalcul {
    return CodeCalcul.of(parsePositiveInteger(code));
}

export const toCodeCalcul = createTransform(parseCodeCalcul);
export const CodeCalculSchema = z
    .string()
    .transform(toCodeCalcul)
    .catch(ctx => {
        onCatch(ctx);
        return CodeCalcul.of(PositiveInteger.of(null));
    });

export function parseAngstromCodeCalcul(code: string): AngstromCodeCalcul {
    return AngstromCodeCalcul.of(parsePositiveInteger(code));
}

export const toAngstromCodeCalcul = createTransform(parseAngstromCodeCalcul);
export const AngstromCodeCalculSchema = z
    .string()
    .transform(toAngstromCodeCalcul)
    .catch(ctx => {
        onCatch(ctx);
        return AngstromCodeCalcul.of(PositiveInteger.of(null));
    });

const decadaireAgroLineSchema = z.object({
    NUM_POSTE: NumeroPosteSchema,
    NOM_USUEL: NomUsuelSchema,
    LAT: LatitudeSchema,
    LON: LongitudeSchema,
    ALTI: AltitudeSchema,
    AAAAMM: DateSchema,
    NUM_DECADE: DecadeSchema,
    // RR         : cumul décadaire des hauteurs de précipitation (en mm et 1/10)
    RR: PositiveFloatSchema, // 1.1
    // CRR        : code calcul de RR pour la décade
    CRR: CodeCalculSchema, // 0
    // TN         : moyenne décadaire de la température minimale (en °C et 1/10)
    TN: FloatOrNullSchema, // -3.3
    // CTN        : code calcul de TN pour la décade
    CTN: CodeCalculSchema, // 0
    // TX         : moyenne décadaire de la température maximale (en °C et 1/10)
    TX: FloatOrNullSchema, // -3.3
    // CTX        : code calcul de TX pour la décade
    CTX: CodeCalculSchema, // 0
    // FFM        : moyenne décadaire de la force du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FFM: PositiveFloatSchema, // 1.1
    // CFFM       : code calcul de FFM pour la décade
    CFFM: CodeCalculSchema, // 0
    // TSVM       : moyenne décadaire de la tension de vapeur (en hPa et 1/10)
    TSVM: PositiveFloatSchema, // 1.1
    // CTSVM      : code calcul de TSVM pour la décade
    CTSVM: CodeCalculSchema, // 0
    // INST       : durée totale d’insolation sur la décade (en mn)
    INST: PositiveIntegerSchema, // 4
    // CINST      : code calcul de l’insolation pour la décade
    CINST: AngstromCodeCalculSchema, // 2
    // GLOT       : cumul de rayonnement global (en J/cm2)
    GLOT: PositiveIntegerSchema, // 4
    // CGLOT      : code calcul de rayonnement pour la décade
    CGLOT: AngstromCodeCalculSchema, // 2
    // ETP        : ETP Penman décadaire (en mm et 1/10)
    ETP: PositiveFloatSchema, // 1.1
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
