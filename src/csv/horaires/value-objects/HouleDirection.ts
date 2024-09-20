import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';

export class InvalidHouleDirectionError extends Error {
    constructor(degrees: PositiveInteger) {
        super(`Invalid houle direction: '${degrees}'. Must be an integer between 0 and 359, or 999.`);
    }
}

export class HouleDirection {
    private readonly degrees: PositiveInteger;

    private constructor(degrees: PositiveInteger) {
        this.degrees = degrees;
    }

    static of(degrees: PositiveInteger): HouleDirection {
        const value = degrees.value();
        if (value !== null && !(0 <= value && value < 360) && value !== 999) {
            throw new InvalidHouleDirectionError(degrees);
        }
        return new HouleDirection(degrees);
    }

    value(): number | null {
        return this.degrees.value();
    }

    toString(): string {
        return this.degrees?.toString() ?? '';
    }
}
