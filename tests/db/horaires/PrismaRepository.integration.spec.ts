import { HoraireDTO } from '@/db/horaires/DTO.js';
import { PrismaHorairesRepository } from '@/db/horaires/PrismaRepository.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { PrismaClient } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { dto1, dto2 } from './InMemoryRepository.spec.js';

describe('PrismaHorairesRepository', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        prisma.decadaire.deleteMany();
    });
    describe('upsert', () => {
        it('should upsert', async () => {
            const repository = new PrismaHorairesRepository({ prisma });

            await repository.upsert(dto1);
            await repository.upsert(dto2);
            const dtos1 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos1).toEqual([dto1, dto2]);

            const modifiedDto1: HoraireDTO = {
                ...dto1,
                QECOULEMENT: 1,
            };

            await repository.upsert(modifiedDto1);
            const dtos2 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos2).toEqual([modifiedDto1, dto2]);
        });
    });
});
