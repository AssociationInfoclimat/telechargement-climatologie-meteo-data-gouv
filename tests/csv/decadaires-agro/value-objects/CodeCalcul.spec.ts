import {
    AngstromCodeCalcul,
    CodeCalcul,
    InvalidAngstromCodeCalculError,
    InvalidCodeCalculError,
} from '@/csv/decadaires-agro/value-objects/CodeCalcul.js';
import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { describe, expect, it } from 'vitest';

describe('CodeCalcul', () => {
    describe('CodeCalcul', () => {
        describe('of', () => {
            it('should accept 0, 1, or null', () => {
                expect(CodeCalcul.of(PositiveInteger.of(0)).value()).toEqual(0);
                expect(CodeCalcul.of(PositiveInteger.of(1)).value()).toEqual(1);
                expect(CodeCalcul.of(PositiveInteger.of(null)).value()).toBeNull();
            });
            it('should not accept anything else', () => {
                expect(() => CodeCalcul.of(PositiveInteger.of(-1)).value()).toThrow(InvalidPositiveIntegerError);
                expect(() => CodeCalcul.of(PositiveInteger.of(0.1)).value()).toThrow(InvalidPositiveIntegerError);
                expect(() => CodeCalcul.of(PositiveInteger.of(2)).value()).toThrow(InvalidCodeCalculError);
            });
        });

        describe('toString', () => {
            it('should return the code as a string', () => {
                expect(CodeCalcul.of(PositiveInteger.of(0)).toString()).toEqual('0');
                expect(CodeCalcul.of(PositiveInteger.of(null)).toString()).toEqual('');
            });
        });
    });

    describe('AngstromCodeCalcul', () => {
        describe('of', () => {
            it('should accept 0, 1, and 2, or null', () => {
                expect(AngstromCodeCalcul.of(PositiveInteger.of(0)).value()).toEqual(0);
                expect(AngstromCodeCalcul.of(PositiveInteger.of(2)).value()).toEqual(2);
                expect(AngstromCodeCalcul.of(PositiveInteger.of(null)).value()).toBeNull();
            });
            it('should not accept anything else', () => {
                expect(() => AngstromCodeCalcul.of(PositiveInteger.of(-1)).value()).toThrow(
                    InvalidPositiveIntegerError
                );
                expect(() => AngstromCodeCalcul.of(PositiveInteger.of(0.1)).value()).toThrow(
                    InvalidPositiveIntegerError
                );
                expect(() => AngstromCodeCalcul.of(PositiveInteger.of(3)).value()).toThrow(
                    InvalidAngstromCodeCalculError
                );
            });
        });

        describe('toString', () => {
            it('should return the code as a string', () => {
                expect(AngstromCodeCalcul.of(PositiveInteger.of(0)).toString()).toEqual('0');
                expect(AngstromCodeCalcul.of(PositiveInteger.of(null)).toString()).toEqual('');
            });
        });
    });
});
