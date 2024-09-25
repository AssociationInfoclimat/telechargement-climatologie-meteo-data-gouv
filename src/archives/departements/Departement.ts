import { ValidationError } from '@/data/value-objects/ValidationError.js';

export class InvalidDepartementError extends ValidationError {
    constructor(numero: number) {
        super(`Invalid departement: '${numero}'. Must be between 1 and 95, 971 and 975, or 984 and 988.`);
    }
}

export class Departement {
    private readonly numero: string;

    private constructor(departement: string) {
        this.numero = departement;
    }

    static of(numero: number | string): Departement {
        numero = parseInt(numero.toString(), 10);
        if (!((1 <= numero && numero <= 95) || (971 <= numero && numero <= 975) || (984 <= numero && numero <= 988))) {
            throw new InvalidDepartementError(numero);
        }
        return new Departement(numero.toString().padStart(2, '0'));
    }

    value(): string {
        return this.numero;
    }

    toString(): string {
        return this.numero;
    }
}
