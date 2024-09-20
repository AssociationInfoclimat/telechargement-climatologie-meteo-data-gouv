import {
    parseCodeQualite,
    parseFloatOrNull,
    parseInteger,
    parseIntegerOrNull,
    parseNomUsuel,
    parseNumeroPoste,
    parsePositiveFloat,
    parsePositiveInteger,
} from '@/csv/parseCSVUtils.js';
import { InvalidPositiveIntegerError } from '@/data/value-objects/PositiveInteger.js';
import { NumeroPoste } from '@/postes/NumeroPoste.js';
import { describe, expect, it } from 'vitest';

describe('parseCSVUtils', () => {
    describe('parseNumeroPoste', () => {
        it('should parse a NumeroPoste value object from a string', () => {
            expect(parseNumeroPoste('01014002')).toEqual(NumeroPoste.of('01014002'));
        });
    });

    describe('parseNomUsuel', () => {
        it('should parse a poste name from a string', () => {
            expect(parseNomUsuel('ARBENT')).toEqual('ARBENT');
        });
    });

    describe('parseInteger', () => {
        it('should parse an integer from a string', () => {
            expect(parseInteger('123')).toEqual(123);
        });
    });

    describe('parseIntegerOrNull', () => {
        it('should parse an integer from a string', () => {
            expect(parseIntegerOrNull('123')).toEqual(123);
        });
        it('should return null if the string is empty', () => {
            expect(parseIntegerOrNull('')).toBeNull();
        });
    });

    describe('parseFloatOrNull', () => {
        it('should parse a float from a string', () => {
            expect(parseFloatOrNull('123.45')).toEqual(123.45);
        });
        it('should return null if the string is empty', () => {
            expect(parseFloatOrNull('')).toBeNull();
        });
    });

    describe('parsePositiveInteger', () => {
        it('should parse a positive integer value object from a string', () => {
            expect(parsePositiveInteger('123').value()).toEqual(123);
        });
        it('should return a null positive number value object if the string is empty', () => {
            expect(parsePositiveInteger('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parsePositiveInteger('123.45')).toThrow(InvalidPositiveIntegerError);
        });
    });

    describe('parsePositiveFloat', () => {
        it('should parse a positive float value object from a string', () => {
            expect(parsePositiveFloat('123.45').value()).toEqual(123.45);
        });
        it('should return a null positive number value object if the string is empty', () => {
            expect(parsePositiveFloat('').value()).toEqual(null);
        });
    });

    describe('parseCodeQualite', () => {
        it('should parse a code qualité value object from a string', () => {
            expect(parseCodeQualite('0').value()).toEqual(0);
        });
        it('should return a null code qualité value object if the string is empty', () => {
            expect(parseCodeQualite('').value()).toEqual(null);
        });
        it('should not accept a float', () => {
            expect(() => parseCodeQualite('0.5')).toThrow(InvalidPositiveIntegerError);
        });
    });
});
