import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';

export function parseNumeroPoste(numero: string): NumeroPoste {
    return NumeroPoste.of(numero);
}

export function parseNomUsuel(nomUsuel: string): string {
    return nomUsuel;
}

export function parseInteger(value: string): number {
    return parseInt(value, 10);
}

export function parseIntegerOrNull(value: string): number | null {
    return value ? parseInteger(value) : null;
}

export function parseFloatOrNull(value: string): number | null {
    return value ? parseFloat(value) : null;
}

export function parsePositiveInteger(value: string): PositiveInteger {
    return PositiveInteger.of(parseFloatOrNull(value));
}

export function parsePositiveFloat(value: string): PositiveFloat {
    return PositiveFloat.of(parseFloatOrNull(value));
}

export function parseCodeQualite(value: string): CodeQualite {
    return CodeQualite.of(parsePositiveInteger(value));
}
