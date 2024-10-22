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
    PositiveFloatSchema,
    PositiveIntegerSchema,
    RelativePercentageSchema,
    TimeSchema,
    tmpFixHeader,
    UVIndexSchema,
} from '@/csv/parseCSVUtils.js';
import { DateSchema } from '@/csv/quotidiennes/parseCSVUtils.js';
import { createTransform } from '@/lib/createTransform.js';
import { Result } from '@/lib/resultUtils.js';
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

export const toBooleanOrNull = createTransform(parseBooleanOrNull);
export const BooleanOrNullSchema = z
    .string()
    .transform(toBooleanOrNull)
    .catch(ctx => {
        onCatch(ctx);
        return null;
    });

const quotidienneLineSchema = z.object({
    NUM_POSTE: NumeroPosteSchema,
    NOM_USUEL: NomUsuelSchema,
    LAT: LatitudeSchema,
    LON: LongitudeSchema,
    ALTI: AltitudeSchema,
    AAAAMMJJ: DateSchema,
    // DHUMEC      : durée d’humectation (en mn)
    DHUMEC: PositiveIntegerSchema, // 1
    QDHUMEC: CodeQualiteSchema, // 9
    // PMERM       : moyenne quotidienne des pressions mer horaires (en hPa et 1/10)
    PMERM: PositiveFloatSchema, // 2.2
    QPMERM: CodeQualiteSchema, // 9
    // PMERMIN     : minimum quotidien des pressions mer minimales horaires (en hPa et 1/10)
    PMERMIN: PositiveFloatSchema, // 2.2
    QPMERMIN: CodeQualiteSchema, // 9
    // INST        : durée d’insolation quotidienne (en mn)
    INST: PositiveIntegerSchema, // 1
    QINST: CodeQualiteSchema, // 9
    // GLOT        : rayonnement global quotidien (en J/cm2)
    GLOT: PositiveIntegerSchema, // 1
    QGLOT: CodeQualiteSchema, // 9
    // DIFT        : rayonnement diffus quotidien (en J/cm2)
    DIFT: PositiveIntegerSchema, // 1
    QDIFT: CodeQualiteSchema, // 9
    // DIRT        : rayonnement direct quotidien (en J/cm2)
    DIRT: PositiveIntegerSchema, // 1
    QDIRT: CodeQualiteSchema, // 9
    // INFRART     : somme des rayonnements infra-rouge horaires (en J/cm2)
    INFRART: PositiveIntegerSchema, // 1
    QINFRART: CodeQualiteSchema, // 9
    // UV          : cumul quotidien de rayonnement ultra-violet (en J/cm2)
    UV: PositiveFloatSchema, // 2.2
    QUV: CodeQualiteSchema, // 9
    // UV_INDICEX  : maximum des indices UV horaires
    UV_INDICEX: UVIndexSchema, // 12
    QUV_INDICEX: CodeQualiteSchema, // 9
    // SIGMA       : fraction d’insolation par rapport à la durée du jour (en %)
    SIGMA: RelativePercentageSchema, // 100
    QSIGMA: CodeQualiteSchema, // 9
    // UN          : minimum quotidien des humidités relatives minimales horaires (en %)
    UN: HumiditeRelativeSchema, // 100
    QUN: CodeQualiteSchema, // 9
    // HUN         : heure de UN (hhmm)
    HUN: TimeSchema, // 1230
    QHUN: CodeQualiteSchema, // 9
    // UX          : maximum quotidien des humidités relatives maximales horaires (en %)
    UX: HumiditeRelativeSchema, // 100
    QUX: CodeQualiteSchema, // 9
    // HUX         : heure de UX (hhmm)
    HUX: TimeSchema, // 1230
    QHUX: CodeQualiteSchema, // 9
    // UM          : moyenne quotidienne des humidités relatives horaires (en %)
    UM: HumiditeRelativeSchema, // 100
    QUM: CodeQualiteSchema, // 9
    // DHUMI40     : durée humidité avec U ≤ 40 % (en mn)
    DHUMI40: PositiveIntegerSchema, // 1
    QDHUMI40: CodeQualiteSchema, // 9
    // DHUMI80     : durée humidité U ≥ 80 % (en mn)
    DHUMI80: PositiveIntegerSchema, // 1
    QDHUMI80: CodeQualiteSchema, // 9
    // TSVM        : tension de vapeur moyenne (en hPa et 1/10)
    TSVM: PositiveFloatSchema, // 2.2
    QTSVM: CodeQualiteSchema, // 9
    // ETPMON      : ETP Monteith quotidienne (en mm et 1/10)
    ETPMON: PositiveFloatSchema, // 2.2
    QETPMON: CodeQualiteSchema, // 9
    // ETPGRILLE   : ETP calculée au point de grille le plus proche (en mm et 1/10)
    ETPGRILLE: PositiveFloatSchema, // 2.2
    QETPGRILLE: CodeQualiteSchema, // 9
    // ECOULEMENTM : moyenne des niveaux d’écoulement horaires
    ECOULEMENTM: PositiveFloatSchema, // 2.2
    QECOULEMENTM: CodeQualiteSchema, // 9
    // HNEIGEF	   : hauteur de neige fraîche tombée en 24 heures (de 06h FU le jour J à 06h FU le jour J+1) qui reste au sol à 06h FU. La valeur relevée à J+1 est affectée au jour J (en cm)
    HNEIGEF: PositiveIntegerSchema, // 1
    QHNEIGEF: CodeQualiteSchema, // 9
    // NEIGETOTX   : épaisseur maximale de neige quotidienne (entre 01h et 24h FU) (en cm)
    NEIGETOTX: PositiveIntegerSchema, // 1
    QNEIGETOTX: CodeQualiteSchema, // 9
    // NEIGETOT06  : épaisseur totale de neige au sol mesurée à 6h (NEIGETOT de 6h) (en cm)
    NEIGETOT06: PositiveIntegerSchema, // 1
    QNEIGETOT06: CodeQualiteSchema, // 9
    // NEIG        : occurrence de neige (0 s’il n’a pas neigé, 1 s’il a neigé)
    NEIG: BooleanOrNullSchema, // true
    QNEIG: CodeQualiteSchema, // 9
    // BROU        : occurrence de brouillard (0 ou 1 si phéno.)
    BROU: BooleanOrNullSchema, // true
    QBROU: CodeQualiteSchema, // 9
    // ORAG        : occurrence d’orage (0 ou 1 si phéno.)
    ORAG: BooleanOrNullSchema, // true
    QORAG: CodeQualiteSchema, // 9
    // GRESIL      : occurrence de grésil (0 ou 1 si phéno.)
    GRESIL: BooleanOrNullSchema, // true
    QGRESIL: CodeQualiteSchema, // 9
    // GRELE       : occurrence de grêle (0 ou 1 si phéno.)
    GRELE: BooleanOrNullSchema, // true
    QGRELE: CodeQualiteSchema, // 9
    // ROSEE       : occurrence de rosée (0 ou 1 si phéno.)
    ROSEE: BooleanOrNullSchema, // true
    QROSEE: CodeQualiteSchema, // 9
    // VERGLAS     : occurrence de verglas (0 ou 1 si phéno.)
    VERGLAS: BooleanOrNullSchema, // true
    QVERGLAS: CodeQualiteSchema, // 9
    // SOLNEIGE    : occurrence de sol couvert de neige (0 ou 1 si phéno.)
    SOLNEIGE: BooleanOrNullSchema, // true
    QSOLNEIGE: CodeQualiteSchema, // 9
    // GELEE       : occurrence de gelée blanche (0 ou 1 si phéno.)
    GELEE: BooleanOrNullSchema, // true
    QGELEE: CodeQualiteSchema, // 9
    // FUMEE       : occurrence de fumée (0 ou 1 si phéno.)
    FUMEE: BooleanOrNullSchema, // true
    QFUMEE: CodeQualiteSchema, // 9
    // BRUME       : occurrence de brume (0 ou 1 si phéno.)
    BRUME: BooleanOrNullSchema, // true
    QBRUME: CodeQualiteSchema, // 9
    // ECLAIR      : occurrence d’éclair (0 ou 1 si phéno)
    ECLAIR: BooleanOrNullSchema, // true
    QECLAIR: CodeQualiteSchema, // 9
    // NB300       : nébulosité maximale > 4/8 et couche < 300 m (en octa)
    NB300: OctaSchema, // 8
    QNB300: CodeQualiteSchema, // 9
    // BA300       : hauteur minimale de NB300 (en m)
    BA300: PositiveIntegerSchema, // 1
    QBA300: CodeQualiteSchema, // 9
    // TMERMIN     : température minimale quotidienne de l’eau de mer (en °C et 1/10)
    TMERMIN: FloatOrNullSchema, // -3.3
    QTMERMIN: CodeQualiteSchema, // 9
    // TMERMAX     : température maximale quotidienne de l’eau de mer (en °C et 1/10)
    TMERMAX: FloatOrNullSchema, // -3.3
    QTMERMAX: CodeQualiteSchema, // 9
});
export type QuotidienneAutresParametresLine = ReturnType<typeof quotidienneLineSchema.parse>;

const headersSchema = z.object(
    Object.fromEntries(Object.keys(quotidienneLineSchema.shape).map(key => [key, z.number()]))
);
export type QuotidienneAutresParametresHeaders = z.infer<typeof headersSchema>;

export function parseHeaders(line: string): QuotidienneAutresParametresHeaders {
    const headers = line.split(';').map(header => header.trim());
    const headersNameToIndex = Object.fromEntries(headers.map((header, index) => [tmpFixHeader(header), index]));
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

export function parseQuotidienneAutresParametresCSV(
    lines: AsyncGenerator<string>
): AsyncGenerator<Result<QuotidienneAutresParametresLine, ParseError<unknown>>> {
    return parseCSV<QuotidienneAutresParametresHeaders, QuotidienneAutresParametresLine>(lines, {
        parseHeaders,
        parseLine,
    });
}

export function createReadingLineDebugMessage(line: QuotidienneAutresParametresLine): string {
    return `Reading line : [${line.NUM_POSTE}] ${line.NOM_USUEL} at ${line.AAAAMMJJ.toISOString()}`;
}
