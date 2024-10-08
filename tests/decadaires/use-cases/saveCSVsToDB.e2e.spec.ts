import { PrismaDecadairesRepository } from '@/db/decadaires/PrismaRepository.js';
import { saveCSVsToDB } from '@/decadaires/use-cases/saveCSVsToDB.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

describe('saveCSVsToDB', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.decadaire.deleteMany();
        await prisma.saveProgress.deleteMany();
    });
    it('should work', async () => {
        const decadairesRepository = new PrismaDecadairesRepository({ prisma });
        const saveProgressRepository = new PrismaSaveProgressRepository(prisma);
        await saveCSVsToDB({
            directory: resolve(`${import.meta.dirname}/../../data-samples`),
            globber: glob,
            lineReader: readLines,
            decadairesRepository,
            saveProgressRepository,
        });
        expect(await getArrayFromAsyncGenerator(decadairesRepository.getAll())).not.toHaveLength(0);
        expect(await saveProgressRepository.getAlreadySaved()).not.toHaveLength(0);
    });
});
