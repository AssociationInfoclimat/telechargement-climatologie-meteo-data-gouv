import { PrismaInfrahorairesRepository } from '@/db/infrahoraires/PrismaRepository.js';
import { saveCSVsToDB } from '@/infrahoraires/use-cases/saveCSVsToDB.js';
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
        await prisma.infrahoraire.deleteMany();
        await prisma.saveProgress.deleteMany();
    });
    it('should work', async () => {
        const infrahorairesRepository = new PrismaInfrahorairesRepository({ prisma });
        const saveProgressRepository = new PrismaSaveProgressRepository(prisma);
        await saveCSVsToDB({
            directory: resolve(`${import.meta.dirname}/../../data-samples`),
            globber: glob,
            lineReader: readLines,
            infrahorairesRepository,
            saveProgressRepository,
        });
        expect(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll())).not.toHaveLength(0);
        expect(await saveProgressRepository.getAlreadySaved()).not.toHaveLength(0);
    });
});
