import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { InvalidWindDirectionError, WindDirection } from '@/data/value-objects/WindDirection.js';
import { describe, expect, it } from 'vitest';

describe('WindDirection', () => {
    describe('of', () => {
        it('should accept between 1 and 360, and null', () => {
            expect(WindDirection.of(PositiveInteger.of(1)).value()).toEqual(1);
            expect(WindDirection.of(PositiveInteger.of(360)).value()).toEqual(360);
            expect(WindDirection.of(PositiveInteger.of(null)).value()).toEqual(null);
        });

        it('should not accept other values', () => {
            expect(() => WindDirection.of(PositiveInteger.of(0))).toThrow(InvalidWindDirectionError);
            expect(() => WindDirection.of(PositiveInteger.of(361))).toThrow(InvalidWindDirectionError);
        });
    });

    describe('toString', () => {
        it('should return the code as a string', () => {
            expect(WindDirection.of(PositiveInteger.of(1)).toString()).toEqual('1');
            expect(WindDirection.of(PositiveInteger.of(360)).toString()).toEqual('360');
            expect(WindDirection.of(PositiveInteger.of(null)).toString()).toEqual('');
        });
    });
});
