import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { PrismaDecadairesRepository } from '@/db/decadaires/PrismaRepository.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { PrismaClient } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';
import { dto1, dto2 } from './InMemoryRepository.spec.js';

describe('PrismaDecadairesRepository', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.decadaire.deleteMany();
    });
    describe('upsert', () => {
        it('should upsert', async () => {
            const repository = new PrismaDecadairesRepository({ prisma });

            await repository.upsert(dto1);
            await repository.upsert(dto2);
            const dtos1 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos1).toEqual([dto1, dto2]);

            const modifiedDto1: DecadaireDTO = {
                ...dto1,
                NBJBROU: 1,
            };

            await repository.upsert(modifiedDto1);
            const dtos2 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos2).toEqual([modifiedDto1, dto2]);
        });
    });
});
