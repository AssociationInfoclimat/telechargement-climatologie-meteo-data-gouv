import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { InMemoryDecadairesAgroRepository } from '@/db/decadaires-agro/InMemoryRepository.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { describe, expect, it } from 'vitest';

export const dto1: DecadaireAgroDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMM: new Date('2023-01-01T00:00:00Z'),
    NUM_DECADE: 1,
    RR: 60.8,
    CRR: 0,
    TN: 5.3,
    CTN: 0,
    TX: 10.8,
    CTX: 0,
    FFM: 2.3,
    CFFM: 0,
    TSVM: 8.7,
    CTSVM: 0,
    INST: null,
    CINST: null,
    GLOT: null,
    CGLOT: null,
    ETP: null,
};

export const dto2: DecadaireAgroDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMM: new Date('2023-01-01T00:00:00Z'),
    NUM_DECADE: 2,
    RR: 51.2,
    CRR: 0,
    TN: -1.8,
    CTN: 0,
    TX: 6.7,
    CTX: 0,
    FFM: 1.9,
    CFFM: 0,
    TSVM: 6.4,
    CTSVM: 0,
    INST: null,
    CINST: null,
    GLOT: null,
    CGLOT: null,
    ETP: null,
};

describe('InMemoryDecadairesAgroRepository', () => {
    describe('upsert', () => {
        it('should upsert', async () => {
            const repository = new InMemoryDecadairesAgroRepository({ dtos: [] });

            await repository.upsert(dto1);
            await repository.upsert(dto2);
            const dtos1 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos1).toEqual([dto1, dto2]);

            const modifiedDto1: DecadaireAgroDTO = {
                ...dto1,
                ETP: 1,
            };

            await repository.upsert(modifiedDto1);
            const dtos2 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos2).toEqual([modifiedDto1, dto2]);
        });
    });
});
