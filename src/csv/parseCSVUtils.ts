import { CodeQualite } from '@/data/value-objects/CodeQualite.js';
import { PositiveNumber } from '@/data/value-objects/PositiveNumber.js';
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

export function parsePositiveInteger(value: string): PositiveNumber {
    return PositiveNumber.of(parseIntegerOrNull(value));
}

export function parsePositiveFloat(value: string): PositiveNumber {
    return PositiveNumber.of(parseFloatOrNull(value));
}

export function parseCodeQualite(value: string): CodeQualite {
    return CodeQualite.of(parseIntegerOrNull(value));
}
