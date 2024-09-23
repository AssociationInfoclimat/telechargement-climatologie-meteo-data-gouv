import { InvalidPositiveIntegerError, PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { InvalidWindDirectionError, WindDirection } from '@/data/value-objects/WindDirection.js';
import { describe, expect, it } from 'vitest';

describe('WindDirection', () => {
    describe('of', () => {
        it('should accept between 0 and 359, and null', () => {
            expect(WindDirection.of(PositiveInteger.of(0)).value()).toEqual(0);
            expect(WindDirection.of(PositiveInteger.of(359)).value()).toEqual(359);
            expect(WindDirection.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => WindDirection.of(PositiveInteger.of(-1))).toThrow(InvalidPositiveIntegerError);
            expect(() => WindDirection.of(PositiveInteger.of(360))).toThrow(InvalidWindDirectionError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(WindDirection.of(PositiveInteger.of(0)).toString()).toEqual('0');
            expect(WindDirection.of(PositiveInteger.of(359)).toString()).toEqual('359');
            expect(WindDirection.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
