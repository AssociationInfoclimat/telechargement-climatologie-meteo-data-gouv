import { InvalidNumeroPosteError, NumeroPoste } from '@/postes/NumeroPoste.js';
import { describe, expect, it } from 'vitest';

describe('NumeroPoste', () => {
    it('should accept number', () => {
        expect(NumeroPoste.of(1014002).value()).toEqual('01014002');
        expect(NumeroPoste.of('01014002').value()).toEqual('01014002');
        expect(NumeroPoste.of(76116001).value()).toEqual('76116001');
        expect(NumeroPoste.of('76116001').value()).toEqual('76116001');
    });
    it('should not accept wrong format', () => {
        expect(() => NumeroPoste.of('1014002').value()).toThrow(InvalidNumeroPosteError);
        expect(() => NumeroPoste.of('761160010').value()).toThrow(InvalidNumeroPosteError);
        expect(() => NumeroPoste.of('116001').value()).toThrow(InvalidNumeroPosteError);
    });
});
