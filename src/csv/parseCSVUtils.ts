import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { Decade } from '@/data/value-objects/Decade.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Jour } from '@/data/value-objects/Jour.js';
import { NbJours } from '@/data/value-objects/NbJours.js';
import { Octa } from '@/data/value-objects/Octa.js';
import { Percentage } from '@/data/value-objects/Percentage.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { RelativePercentage } from '@/data/value-objects/RelativePercentage.js';
import { Time } from '@/data/value-objects/Time.js';
import { UVIndex } from '@/data/value-objects/UVIndex.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { createTransform } from '@/lib/createTransform.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';
import { z, ZodError } from 'zod';

export function parseNumeroPoste(numero: string): NumeroPoste {
    return NumeroPoste.of(numero);
}

export const toNumeroPoste = createTransform(parseNumeroPoste);
export const NumeroPosteSchema = z.string().transform(toNumeroPoste);

export function parseNomUsuel(nomUsuel: string): string {
    return nomUsuel;
}

export const toNomUsuel = createTransform(parseNomUsuel);
export const NomUsuelSchema = z.string().transform(toNomUsuel);

export function parseInteger(value: string): number {
    return parseInt(value, 10);
}

export const toInteger = createTransform(parseInteger);

export function parseIntegerOrNull(value: string): number | null {
    return value ? parseInteger(value) : null;
}

export const toIntegerOrNull = createTransform(parseIntegerOrNull);

export function parseFloatOrNull(value: string): number | null {
    return value ? parseFloat(value) : null;
}

export const toFloatOrNull = createTransform(parseFloatOrNull);
export const FloatOrNullSchema = z
    .string()
    .transform(toFloatOrNull)
    .catch(ctx => {
        onCatch(ctx);
        return null;
    });

export function parsePositiveInteger(value: string): PositiveInteger {
    return PositiveInteger.of(parseFloatOrNull(value));
}

export const toPositiveInteger = createTransform(parsePositiveInteger);
export const PositiveIntegerSchema = z
    .string()
    .transform(toPositiveInteger)
    .catch(ctx => {
        onCatch(ctx);
        return PositiveInteger.of(null);
    });

export function parsePositiveFloat(value: string): PositiveFloat {
    return PositiveFloat.of(parseFloatOrNull(value));
}

export const toPositiveFloat = createTransform(parsePositiveFloat);
export const PositiveFloatSchema = z
    .string()
    .transform(toPositiveFloat)
    .catch(ctx => {
        onCatch(ctx);
        return PositiveFloat.of(null);
    });

export const LatitudeSchema = z.string().transform(parseFloat);
export const LongitudeSchema = z.string().transform(parseFloat);
export const AltitudeSchema = z.string().transform(toInteger);

export function parseCodeQualite(value: string): CodeQualite {
    return CodeQualite.of(PositiveInteger.of(parseFloatOrNull(value)));
}

export const toCodeQualite = createTransform(parseCodeQualite);
export const CodeQualiteSchema = z
    .string()
    .transform(toCodeQualite)
    .catch(ctx => {
        onCatch(ctx);
        return CodeQualite.of(PositiveInteger.of(null));
    });

export function parseTime(value: string): Time {
    return Time.of(value);
}

export const toTime = createTransform(parseTime);
export const TimeSchema = z
    .string()
    .transform(toTime)
    .catch(ctx => {
        onCatch(ctx);
        return Time.of('');
    });

export function parsePercentage(value: string): Percentage {
    return Percentage.of(parsePositiveInteger(value));
}

export const toPercentage = createTransform(parsePercentage);

export function parseRelativePercentage(value: string): RelativePercentage {
    return RelativePercentage.of(parseFloatOrNull(value));
}

export const toRelativePercentage = createTransform(parseRelativePercentage);
export const RelativePercentageSchema = z
    .string()
    .transform(toRelativePercentage)
    .catch(ctx => {
        onCatch(ctx);
        return RelativePercentage.of(null);
    });

export function parseHumiditeRelative(value: string): HumiditeRelative {
    return HumiditeRelative.of(parseFloatOrNull(value));
}

export const toHumiditeRelative = createTransform(parseHumiditeRelative);
export const HumiditeRelativeSchema = z
    .string()
    .transform(toHumiditeRelative)
    .catch(ctx => {
        onCatch(ctx);
        return HumiditeRelative.of(null);
    });

export function parseOcta(value: string): Octa {
    return Octa.of(parsePositiveInteger(value));
}

export const toOcta = createTransform(parseOcta);
export const OctaSchema = z
    .string()
    .transform(toOcta)
    .catch(ctx => {
        onCatch(ctx);
        return Octa.of(PositiveInteger.of(null));
    });

export function parseUVIndex(value: string): UVIndex {
    return UVIndex.of(parsePositiveInteger(value));
}

export const toUVIndex = createTransform(parseUVIndex);
export const UVIndexSchema = z
    .string()
    .transform(toUVIndex)
    .catch(ctx => {
        onCatch(ctx);
        return UVIndex.of(PositiveInteger.of(null));
    });

export function parseWindDirection(value: string): WindDirection {
    return WindDirection.of(parsePositiveInteger(value));
}

export const toWindDirection = createTransform(parseWindDirection);
export const WindDirectionSchema = z
    .string()
    .transform(toWindDirection)
    .catch(ctx => {
        onCatch(ctx);
        return WindDirection.of(PositiveInteger.of(null));
    });

export function parseNbJours(nbJours: string): NbJours {
    return NbJours.of(parsePositiveInteger(nbJours));
}

export const toNbJours = createTransform(parseNbJours);
export const NbJoursSchema = z
    .string()
    .transform(toNbJours)
    .catch(ctx => {
        onCatch(ctx);
        return NbJours.of(PositiveInteger.of(null));
    });

export function parseJour(jour: string): Jour {
    return Jour.of(parsePositiveInteger(jour));
}

export const toJour = createTransform(parseJour);
export const JourSchema = z
    .string()
    .transform(toJour)
    .catch(ctx => {
        onCatch(ctx);
        return Jour.of(PositiveInteger.of(null));
    });

export function parseDecade(decade: string): Decade {
    return Decade.of(parsePositiveInteger(decade));
}

export const toDecade = createTransform(parseDecade);
export const DecadeSchema = z.string().transform(toDecade);

export class ParseError<T, E extends Error = Error> extends Error {
    public readonly headers: string;
    public readonly line: string;
    public readonly error: E;
    public readonly data?: T;

    constructor({ headers, line, error, data }: { headers: string; line: string; error: E; data?: T }) {
        super(`Error parsing line:
Headers : ${headers}
CSV     : ${line}
`);
        this.headers = headers;
        this.line = line;
        this.error = error;
        this.data = data;
    }
}

// TODO : Remove once the csv headers are fixed
export function tmpFixHeader(value: string): string {
    switch (value) {
        case 'NBGREL':
            return 'NBJGREL';
        case 'QPERMIN':
            return 'QPMERMIN';
        case 'QCB2':
            return 'QB2';
        default:
            return value;
    }
}

export function onCatch(ctx: { error: ZodError; input: unknown }): void {
    LoggerSingleton.getSingleton().warn({
        message: 'Invalid value in incoming data replaced by default value',
        data: ctx.error,
    });
}
