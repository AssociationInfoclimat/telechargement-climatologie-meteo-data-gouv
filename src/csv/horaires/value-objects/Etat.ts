import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';

export class InvalidEtatError extends Error {
    constructor(etat: PositiveInteger) {
        super(`Invalid etat: '${etat}'. Must be an integer between 0 and 9.`);
    }
}

export class Etat {
    private readonly etat: PositiveInteger;

    private constructor(etat: PositiveInteger) {
        this.etat = etat;
    }

    static of(etat: PositiveInteger): Etat {
        const value = etat.value();
        if (value !== null && !(0 <= value && value <= 9)) {
            throw new InvalidEtatError(etat);
        }
        return new Etat(etat);
    }

    value(): number | null {
        return this.etat.value();
    }

    toString(): string {
        return this.etat?.toString() ?? '';
    }
}
