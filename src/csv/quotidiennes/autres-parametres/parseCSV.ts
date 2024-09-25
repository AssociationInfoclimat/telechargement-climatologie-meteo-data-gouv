import {
    parseCodeQualite,
    parseFloatOrNull,
    parseInteger,
    parseNomUsuel,
    parseNumeroPoste,
    parseOcta,
    parsePercentage,
    parsePositiveFloat,
    parsePositiveInteger,
    parseTime,
    parseUVIndex,
} from '@/csv/parseCSVUtils.js';
import { parseDate } from '@/csv/quotidiennes/parseCSVUtils.js';
import { z } from 'zod';

export function parseBooleanOrNull(value: string): boolean | null {
    switch (value) {
        case '0':
            return false;
        case '1':
            return true;
        case '':
            return null;
        default:
            throw new Error(`Invalid boolean value: '${value}'`);
    }
}

const quotidienneLineSchema = z.object({
    NUM_POSTE: z.string().transform(parseNumeroPoste),
    NOM_USUEL: z.string().transform(parseNomUsuel),
    LAT: z.string().transform(parseFloat),
    LON: z.string().transform(parseFloat),
    ALTI: z.string().transform(parseInteger),
    AAAAMMJJ: z.string().transform(parseDate),
    // DHUMEC      : durée d’humectation (en mn)
    DHUMEC: z.string().transform(parsePositiveInteger), // 1
    QDHUMEC: z.string().transform(parseCodeQualite), // 9
    // PMERM       : moyenne quotidienne des pressions mer horaires (en hPa et 1/10)
    PMERM: z.string().transform(parsePositiveFloat), // 2.2
    QPMERM: z.string().transform(parseCodeQualite), // 9
    // PMERMIN     : minimum quotidien des pressions mer minimales horaires (en hPa et 1/10)
    PMERMIN: z.string().transform(parsePositiveFloat), // 2.2
    QPMERMIN: z.string().transform(parseCodeQualite), // 9
    // INST        : durée d’insolation quotidienne (en mn)
    INST: z.string().transform(parsePositiveInteger), // 1
    QINST: z.string().transform(parseCodeQualite), // 9
    // GLOT        : rayonnement global quotidien (en J/cm2)
    GLOT: z.string().transform(parsePositiveInteger), // 1
    QGLOT: z.string().transform(parseCodeQualite), // 9
    // DIFT        : rayonnement diffus quotidien (en J/cm2)
    DIFT: z.string().transform(parsePositiveInteger), // 1
    QDIFT: z.string().transform(parseCodeQualite), // 9
    // DIRT        : rayonnement direct quotidien (en J/cm2)
    DIRT: z.string().transform(parsePositiveInteger), // 1
    QDIRT: z.string().transform(parseCodeQualite), // 9
    // INFRART     : somme des rayonnements infra-rouge horaires (en J/cm2)
    INFRART: z.string().transform(parsePositiveInteger), // 1
    QINFRART: z.string().transform(parseCodeQualite), // 9
    // UV          : cumul quotidien de rayonnement ultra-violet (en J/cm2)
    UV: z.string().transform(parseUVIndex), // 12
    QUV: z.string().transform(parseCodeQualite), // 9
    // UV_INDICEX  : maximum des indices UV horaires
    UV_INDICEX: z.string().transform(parseUVIndex), // 12
    QUV_INDICEX: z.string().transform(parseCodeQualite), // 9
    // SIGMA       : fraction d’insolation par rapport à la durée du jour (en %)
    SIGMA: z.string().transform(parsePercentage), // 100
    QSIGMA: z.string().transform(parseCodeQualite), // 9
    // UN          : minimum quotidien des humidités relatives minimales horaires (en %)
    UN: z.string().transform(parsePercentage), // 100
    QUN: z.string().transform(parseCodeQualite), // 9
    // HUN         : heure de UN (hhmm)
    HUN: z.string().transform(parseTime), // 1230
    QHUN: z.string().transform(parseCodeQualite), // 9
    // UX          : maximum quotidien des humidités relatives maximales horaires (en %)
    UX: z.string().transform(parsePercentage), // 100
    QUX: z.string().transform(parseCodeQualite), // 9
    // HUX         : heure de UX (hhmm)
    HUX: z.string().transform(parseTime), // 1230
    QHUX: z.string().transform(parseCodeQualite), // 9
    // UM          : moyenne quotidienne des humidités relatives horaires (en %)
    UM: z.string().transform(parsePercentage), // 100
    QUM: z.string().transform(parseCodeQualite), // 9
    // DHUMI40     : durée humidité avec U ≤ 40 % (en mn)
    DHUMI40: z.string().transform(parsePositiveInteger), // 1
    QDHUMI40: z.string().transform(parseCodeQualite), // 9
    // DHUMI80     : durée humidité U ≥ 80 % (en mn)
    DHUMI80: z.string().transform(parsePositiveInteger), // 1
    QDHUMI80: z.string().transform(parseCodeQualite), // 9
    // TSVM        : tension de vapeur moyenne (en hPa et 1/10)
    TSVM: z.string().transform(parsePositiveFloat), // 2.2
    QTSVM: z.string().transform(parseCodeQualite), // 9
    // ETPMON      : ETP Monteith quotidienne (en mm et 1/10)
    ETPMON: z.string().transform(parsePositiveFloat), // 2.2
    QETPMON: z.string().transform(parseCodeQualite), // 9
    // ETPGRILLE   : ETP calculée au point de grille le plus proche (en mm et 1/10)
    ETPGRILLE: z.string().transform(parsePositiveFloat), // 2.2
    QETPGRILLE: z.string().transform(parseCodeQualite), // 9
    // ECOULEMENTM : moyenne des niveaux d’écoulement horaires
    ECOULEMENTM: z.string().transform(parsePositiveFloat), // 2.2
    QECOULEMENTM: z.string().transform(parseCodeQualite), // 9
    // HNEIGEF	   : hauteur de neige fraîche tombée en 24 heures (de 06h FU le jour J à 06h FU le jour J+1) qui reste au sol à 06h FU. La valeur relevée à J+1 est affectée au jour J (en cm)
    HNEIGEF: z.string().transform(parsePositiveInteger), // 1
    QHNEIGEF: z.string().transform(parseCodeQualite), // 9
    // NEIGETOTX   : épaisseur maximale de neige quotidienne (entre 01h et 24h FU) (en cm)
    NEIGETOTX: z.string().transform(parsePositiveInteger), // 1
    QNEIGETOTX: z.string().transform(parseCodeQualite), // 9
    // NEIGETOT06  : épaisseur totale de neige au sol mesurée à 6h (NEIGETOT de 6h) (en cm)
    NEIGETOT06: z.string().transform(parsePositiveInteger), // 1
    QNEIGETOT06: z.string().transform(parseCodeQualite), // 9
    // NEIG        : occurrence de neige (0 s’il n’a pas neigé, 1 s’il a neigé)
    NEIG: z.string().transform(parseBooleanOrNull), // true
    QNEIG: z.string().transform(parseCodeQualite), // 9
    // BROU        : occurrence de brouillard (0 ou 1 si phéno.)
    BROU: z.string().transform(parseBooleanOrNull), // true
    QBROU: z.string().transform(parseCodeQualite), // 9
    // ORAG        : occurrence d’orage (0 ou 1 si phéno.)
    ORAG: z.string().transform(parseBooleanOrNull), // true
    QORAG: z.string().transform(parseCodeQualite), // 9
    // GRESIL      : occurrence de grésil (0 ou 1 si phéno.)
    GRESIL: z.string().transform(parseBooleanOrNull), // true
    QGRESIL: z.string().transform(parseCodeQualite), // 9
    // GRELE       : occurrence de grêle (0 ou 1 si phéno.)
    GRELE: z.string().transform(parseBooleanOrNull), // true
    QGRELE: z.string().transform(parseCodeQualite), // 9
    // ROSEE       : occurrence de rosée (0 ou 1 si phéno.)
    ROSEE: z.string().transform(parseBooleanOrNull), // true
    QROSEE: z.string().transform(parseCodeQualite), // 9
    // VERGLAS     : occurrence de verglas (0 ou 1 si phéno.)
    VERGLAS: z.string().transform(parseBooleanOrNull), // true
    QVERGLAS: z.string().transform(parseCodeQualite), // 9
    // SOLNEIGE    : occurrence de sol couvert de neige (0 ou 1 si phéno.)
    SOLNEIGE: z.string().transform(parseBooleanOrNull), // true
    QSOLNEIGE: z.string().transform(parseCodeQualite), // 9
    // GELEE       : occurrence de gelée blanche (0 ou 1 si phéno.)
    GELEE: z.string().transform(parseBooleanOrNull), // true
    QGELEE: z.string().transform(parseCodeQualite), // 9
    // FUMEE       : occurrence de fumée (0 ou 1 si phéno.)
    FUMEE: z.string().transform(parseBooleanOrNull), // true
    QFUMEE: z.string().transform(parseCodeQualite), // 9
    // BRUME       : occurrence de brume (0 ou 1 si phéno.)
    BRUME: z.string().transform(parseBooleanOrNull), // true
    QBRUME: z.string().transform(parseCodeQualite), // 9
    // ECLAIR      : occurrence d’éclair (0 ou 1 si phéno)
    ECLAIR: z.string().transform(parseBooleanOrNull), // true
    QECLAIR: z.string().transform(parseCodeQualite), // 9
    // NB300       : nébulosité maximale > 4/8 et couche < 300 m (en octa)
    NB300: z.string().transform(parseOcta), // 8
    QNB300: z.string().transform(parseCodeQualite), // 9
    // BA300       : hauteur minimale de NB300 (en m)
    BA300: z.string().transform(parsePositiveInteger), // 1
    QBA300: z.string().transform(parseCodeQualite), // 9
    // TMERMIN     : température minimale quotidienne de l’eau de mer (en °C et 1/10)
    TMERMIN: z.string().transform(parseFloatOrNull), // -3.3
    QTMERMIN: z.string().transform(parseCodeQualite), // 9
    // TMERMAX     : température maximale quotidienne de l’eau de mer (en °C et 1/10)
    TMERMAX: z.string().transform(parseFloatOrNull), // -3.3
    QTMERMAX: z.string().transform(parseCodeQualite), // 9
});
export type QuotidienneAutresParametresLine = ReturnType<typeof quotidienneLineSchema.parse>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(quotidienneLineSchema.shape).map(key => [key, z.number()]))
);
export type QuotidienneAutresParametresHeaders = z.infer<typeof headersSchema>;

export function parseHeaders(line: string): QuotidienneAutresParametresHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
    return headersSchema.parse(headersNameToIndex);
}

export function parseLine(
    line: string,
    headersNameToIndex: QuotidienneAutresParametresHeaders
): QuotidienneAutresParametresLine {
    const values = line.split(';').map(value => value.trim());
    return quotidienneLineSchema.parse(
        Object.fromEntries(Object.entries(headersNameToIndex).map(([key, index]) => [key, values[index]]))
    );
}

export async function* parseCSV(lines: AsyncGenerator<string>): AsyncGenerator<QuotidienneAutresParametresLine> {
    const headers = await lines.next();
    const headersNameToIndex = parseHeaders(headers.value as string);
    for await (const line of lines) {
        if (line.trim()) {
            yield parseLine(line, headersNameToIndex);
        }
    }
}
