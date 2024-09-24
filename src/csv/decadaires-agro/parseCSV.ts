import { AngstromCodeCalcul, CodeCalcul } from '@/csv/decadaires-agro/value-objects/CodeCalcul.js';
import {
    parseDecade,
    parseFloatOrNull,
    parseInteger,
    parseNomUsuel,
    parseNumeroPoste,
    parsePositiveFloat,
    parsePositiveInteger,
} from '@/csv/parseCSVUtils.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    return new Date(`${yyyy}-${mm}-01T00:00:00Z`);
}

export function parseCodeCalcul(code: string): CodeCalcul {
    return CodeCalcul.of(parsePositiveInteger(code));
}

export function parseAngstromCodeCalcul(code: string): AngstromCodeCalcul {
    return AngstromCodeCalcul.of(parsePositiveInteger(code));
}

const decadaireAgroLineSchema = z.object({
    NUM_POSTE: z.string().transform(parseNumeroPoste),
    NOM_USUEL: z.string().transform(parseNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(parseInteger),
    AAAAMM: z.string().transform(parseDate),
    NUM_DECADE: z.string().transform(parseDecade),
    // RR         : cumul décadaire des hauteurs de précipitation (en mm et 1/10)
    RR: z.string().transform(parsePositiveFloat), // 1.1
    // CRR        : code calcul de RR pour la décade
    CRR: z.string().transform(parseCodeCalcul), // 0
    // TN         : moyenne décadaire de la température minimale (en °C et 1/10)
    TN: z.string().transform(parseFloatOrNull), // -3.3
    // CTN        : code calcul de TN pour la décade
    CTN: z.string().transform(parseCodeCalcul), // 0
    // TX         : moyenne décadaire de la température maximale (en °C et 1/10)
    TX: z.string().transform(parseFloatOrNull), // -3.3
    // CTX        : code calcul de TX pour la décade
    CTX: z.string().transform(parseCodeCalcul), // 0
    // FFM        : moyenne décadaire de la force du vent moyenné sur 10 mn, à 10 m (en m/s et 1/10)
    FFM: z.string().transform(parsePositiveFloat), // 1.1
    // CFFM       : code calcul de FFM pour la décade
    CFFM: z.string().transform(parseCodeCalcul), // 0
    // TSVM       : moyenne décadaire de la tension de vapeur (en hPa et 1/10)
    TSVM: z.string().transform(parsePositiveFloat), // 1.1
    // CTSVM      : code calcul de TSVM pour la décade
    CTSVM: z.string().transform(parseCodeCalcul), // 0
    // INST       : durée totale d’insolation sur la décade (en mn)
    INST: z.string().transform(parsePositiveInteger), // 4
    // CINST      : code calcul de l’insolation pour la décade
    CINST: z.string().transform(parseAngstromCodeCalcul), // 2
    // GLOT       : cumul de rayonnement global (en J/cm2)
    GLOT: z.string().transform(parsePositiveInteger), // 4
    // CGLOT      : code calcul de rayonnement pour la décade
    CGLOT: z.string().transform(parseAngstromCodeCalcul), // 2
    // ETP        : ETP Penman décadaire (en mm et 1/10)
    ETP: z.string().transform(parsePositiveFloat), // 1.1
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

export async function* parseCSV(lines: AsyncGenerator<string>): AsyncGenerator<DecadaireAgroLine> {
    const headers = await lines.next();
    const headersNameToIndex = parseHeaders(headers.value as string);
    for await (const line of lines) {
        if (line.trim()) {
            yield parseLine(line, headersNameToIndex);
        }
    }
}
