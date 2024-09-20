export class InvalidCodeQualiteError extends Error {
    constructor(code: number) {
        super(`Invalid code qualité: '${code}'. Must be 0, 1, 2 or 9.`);
    }
}

export class CodeQualite {
    private readonly code: number | null;

    private constructor(code: number | null) {
        this.code = code;
    }

    static of(code: number | null): CodeQualite {
        if (code !== null && ![0, 1, 2, 9].includes(code)) {
            throw new InvalidCodeQualiteError(code);
        }
        return new CodeQualite(code);
    }

    value(): number | null {
        return this.code;
    }

    toString(): string {
        return this.code !== null ? this.code.toString() : '';
    }
}
