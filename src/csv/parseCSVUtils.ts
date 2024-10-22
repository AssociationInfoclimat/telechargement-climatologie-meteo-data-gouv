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
import { ZodError } from 'zod';

export function parseNumeroPoste(numero: string): NumeroPoste {
    return NumeroPoste.of(numero);
}

export const toNumeroPoste = createTransform(parseNumeroPoste);

export function parseNomUsuel(nomUsuel: string): string {
    return nomUsuel;
}

export const toNomUsuel = createTransform(parseNomUsuel);

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

export function parsePositiveInteger(value: string): PositiveInteger {
    return PositiveInteger.of(parseFloatOrNull(value));
}

export const toPositiveInteger = createTransform(parsePositiveInteger);

export function parsePositiveFloat(value: string): PositiveFloat {
    return PositiveFloat.of(parseFloatOrNull(value));
}

export const toPositiveFloat = createTransform(parsePositiveFloat);

export function parseCodeQualite(value: string): CodeQualite {
    return CodeQualite.of(PositiveInteger.of(parseFloatOrNull(value)));
}

export const toCodeQualite = createTransform(parseCodeQualite);

export function parseTime(value: string): Time {
    return Time.of(value);
}

export const toTime = createTransform(parseTime);

export function parsePercentage(value: string): Percentage {
    return Percentage.of(parsePositiveInteger(value));
}

export const toPercentage = createTransform(parsePercentage);

export function parseRelativePercentage(value: string): RelativePercentage {
    return RelativePercentage.of(parseFloatOrNull(value));
}

export const toRelativePercentage = createTransform(parseRelativePercentage);

export function parseHumiditeRelative(value: string): HumiditeRelative {
    return HumiditeRelative.of(parseFloatOrNull(value));
}

export const toHumiditeRelative = createTransform(parseHumiditeRelative);

export function parseOcta(value: string): Octa {
    return Octa.of(parsePositiveInteger(value));
}

export const toOcta = createTransform(parseOcta);

export function parseUVIndex(value: string): UVIndex {
    return UVIndex.of(parsePositiveInteger(value));
}

export const toUVIndex = createTransform(parseUVIndex);

export function parseWindDirection(value: string): WindDirection {
    return WindDirection.of(parsePositiveInteger(value));
}

export const toWindDirection = createTransform(parseWindDirection);

export function parseNbJours(nbJours: string): NbJours {
    return NbJours.of(parsePositiveInteger(nbJours));
}

export const toNbJours = createTransform(parseNbJours);

export function parseJour(jour: string): Jour {
    return Jour.of(parsePositiveInteger(jour));
}

export const toJour = createTransform(parseJour);

export function parseDecade(decade: string): Decade {
    return Decade.of(parsePositiveInteger(decade));
}

export const toDecade = createTransform(parseDecade);

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
