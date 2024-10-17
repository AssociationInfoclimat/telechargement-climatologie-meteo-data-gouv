import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidUVIndexError extends ValidationError {
    constructor(index: PositiveInteger) {
        super(`Invalid index: '${index}'. Must be an integer between 0 and 20.`);
    }
}

export class UVIndex {
    private readonly index: PositiveInteger;

    private constructor(index: PositiveInteger) {
        this.index = index;
    }

    static of(index: PositiveInteger): UVIndex {
        const value = index.value();
        if (value !== null && !(0 <= value && value <= 20)) {
            throw new InvalidUVIndexError(index);
        }
        return new UVIndex(index);
    }

    value(): number | null {
        return this.index.value();
    }

    toString(): string {
        return this.index?.toString() ?? '';
    }
}
