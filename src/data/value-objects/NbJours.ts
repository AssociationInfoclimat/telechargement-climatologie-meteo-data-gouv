import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';

export class InvalidNbJoursError extends Error {
    constructor(nbJours: PositiveInteger) {
        super(`Invalid nbJours: ${nbJours}. Must be an integer between 0 and 31.`);
    }
}

export class NbJours {
    private readonly nbJours: PositiveInteger;

    private constructor(nbJours: PositiveInteger) {
        this.nbJours = nbJours;
    }

    static of(nbJours: PositiveInteger): NbJours {
        const value = nbJours.value();
        if (value !== null && !(0 <= value && value <= 31)) {
            throw new InvalidNbJoursError(nbJours);
        }
        return new NbJours(nbJours);
    }

    value(): number | null {
        return this.nbJours.value();
    }

    toString(): string {
        return this.nbJours?.toString() ?? '';
    }
}
