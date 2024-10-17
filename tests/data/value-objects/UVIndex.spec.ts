import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { InvalidUVIndexError, UVIndex } from '@/data/value-objects/UVIndex.js';
import { describe, expect, it } from 'vitest';

describe('UVIndex', () => {
    describe('of', () => {
        it('should accept between 0 and 20, and null', () => {
            expect(UVIndex.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(UVIndex.of(PositiveInteger.of(20)).value()).toEqual(20);
            expect(UVIndex.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => UVIndex.of(PositiveInteger.of(-1))).toThrow(InvalidPositiveIntegerError);
            expect(() => UVIndex.of(PositiveInteger.of(21))).toThrow(InvalidUVIndexError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(UVIndex.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(UVIndex.of(PositiveInteger.of(20)).toString()).toEqual('20');
            expect(UVIndex.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
