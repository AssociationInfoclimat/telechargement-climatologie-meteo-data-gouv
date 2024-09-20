export class InvalidPositiveNumberError extends Error {
    constructor(value: number) {
        super(`Invalid positive number: '${value}'. Must be greater than or equal to 0.`);
    }
}

export class PositiveNumber {
    private readonly v: number | null;

    private constructor(value: number | null) {
        this.v = value;
    }

    static of(value: number | null): PositiveNumber {
        if (value !== null && value < 0) {
            throw new InvalidPositiveNumberError(value);
        }
        return new PositiveNumber(value);
    }

    value(): number | null {
        return this.v;
    }

    toString(): string {
        return this.v !== null ? this.v.toString() : '';
    }
}
