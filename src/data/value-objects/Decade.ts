import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';

export class InvalidDecadeError extends Error {
    constructor(decade: PositiveInteger) {
        super(`Invalid decade : '${decade}'. Must be an integer between 1 and 3.`);
    }
}

export class Decade {
    private readonly decade: PositiveInteger;

    private constructor(decade: PositiveInteger) {
        this.decade = decade;
    }

    static of(decade: PositiveInteger): Decade {
        const value = decade.value();
        if (value === null || !(1 <= value && value <= 3)) {
            throw new InvalidDecadeError(decade);
        }
        return new Decade(decade);
    }

    value(): number | null {
        return this.decade.value();
    }

    toString(): string {
        return this.decade.toString();
    }
}
