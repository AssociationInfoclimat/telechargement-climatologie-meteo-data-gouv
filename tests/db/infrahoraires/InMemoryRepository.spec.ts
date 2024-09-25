import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InMemoryInfrahorairesRepository } from '@/db/infrahoraires/InMemoryRepository.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { describe, expect, it } from 'vitest';

export const dto1: InfrahoraireDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMMJJHHMN: new Date('2023-06-15T12:30:00Z'),
    RR: 1.1,
    QRR: 1,
};

export const dto2: InfrahoraireDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMMJJHHMN: new Date('2023-06-15T12:36:00Z'),
    RR: null,
    QRR: null,
};

describe('InMemoryInfrahorairesRepository', () => {
    describe('upsert', () => {
        it('should upsert', async () => {
            const repository = new InMemoryInfrahorairesRepository({ dtos: [] });

            await repository.upsert(dto1);
            await repository.upsert(dto2);
            const dtos1 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos1).toEqual([dto1, dto2]);

            const modifiedDto1: InfrahoraireDTO = {
                ...dto1,
                QRR: 1,
            };

            await repository.upsert(modifiedDto1);
            const dtos2 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos2).toEqual([modifiedDto1, dto2]);
        });
    });
});
