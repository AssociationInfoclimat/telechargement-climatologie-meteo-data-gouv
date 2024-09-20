export class InvalidNumeroPosteError extends Error {
    constructor(numero: string) {
        super(`'${numero}' n'est pas une chaîne de 8 caractères`);
    }
}

export class NumeroPoste {
    private readonly numero: string;

    private constructor(numero: string) {
        this.numero = numero;
    }

    static of(numero: string | number): NumeroPoste {
        if (typeof numero === 'string') {
            if (numero.length !== 8) {
                throw new InvalidNumeroPosteError(numero);
            }
        } else {
            numero = numero.toString();
            if (numero.length !== 7 && numero.length !== 8) {
                throw new InvalidNumeroPosteError(numero);
            }
            numero = numero.padStart(8, '0');
        }
        return new NumeroPoste(numero);
    }

    value(): string {
        return this.numero;
    }

    toString(): string {
        return this.value();
    }
}
