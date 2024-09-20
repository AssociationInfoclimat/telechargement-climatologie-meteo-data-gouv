import { PositiveNumber } from '@/data/value-objects/PositiveNumber.js';

export class InvalidPositiveIntegerError extends Error {
    constructor(value: number) {
        super(`Invalid positive integer: '${value}'. Must be greater than or equal to 0, and not be a float.`);
    }
}

export class PositiveInteger extends PositiveNumber {
    static of(value: number | null): PositiveInteger {
        if (value !== null && (value < 0 || value % 1 !== 0)) {
            throw new InvalidPositiveIntegerError(value);
        }
        return new PositiveInteger(value);
    }
}
