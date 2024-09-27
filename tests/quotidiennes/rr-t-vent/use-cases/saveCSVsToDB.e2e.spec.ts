import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { saveCSVsToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveCSVsToDB.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

describe('saveCSVsToDB', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.quotidienne.deleteMany();
        await prisma.saveProgress.deleteMany();
    });
    it('should work', async () => {
        const quotidiennesRepository = new PrismaQuotidiennesRepository({ prisma });
        const saveProgressRepository = new PrismaSaveProgressRepository(prisma);
        await saveCSVsToDB({
            directory: resolve(`${import.meta.dirname}/../../../data-samples`),
            globber: glob,
            lineReader: readLines,
            quotidiennesRepository,
            saveProgressRepository,
        });
        expect(await getArrayFromAsyncGenerator(quotidiennesRepository.getAll())).not.toHaveLength(0);
        expect(await saveProgressRepository.getAlreadySaved()).not.toHaveLength(0);
    });
});
