import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidCodeCalculError extends ValidationError {
    constructor(code: PositiveInteger) {
        super(`Invalid code calcul: '${code}'. Must be 0 or 1.`);
    }
}

export class CodeCalcul {
    private readonly code: PositiveInteger;

    private constructor(code: PositiveInteger) {
        this.code = code;
    }

    static of(code: PositiveInteger): CodeCalcul {
        const value = code.value();
        if (value !== null && value > 1) {
            throw new InvalidCodeCalculError(code);
        }
        return new CodeCalcul(code);
    }

    value(): number | null {
        return this.code.value();
    }

    toString(): string {
        return this.code.toString();
    }
}

export class InvalidAngstromCodeCalculError extends ValidationError {
    constructor(code: PositiveInteger) {
        super(`Invalid Angstrom code calcul: '${code}'. Must be 0, 1 or 2.`);
    }
}

export class AngstromCodeCalcul {
    private readonly code: PositiveInteger;

    private constructor(code: PositiveInteger) {
        this.code = code;
    }

    static of(code: PositiveInteger): AngstromCodeCalcul {
        const value = code.value();
        if (value !== null && value > 2) {
            throw new InvalidAngstromCodeCalculError(code);
        }
        return new AngstromCodeCalcul(code);
    }

    value(): number | null {
        return this.code.value();
    }

    toString(): string {
        return this.code.toString();
    }
}
