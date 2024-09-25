import { PrismaMensuellesRepository } from '@/db/mensuelles/PrismaRepository.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { saveCSVsToDB } from '@/mensuelles/use-cases/saveCSVsToDB.js';
import { PrismaClient } from '@prisma/client';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

describe('saveCSVsToDB', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.mensuelle.deleteMany();
    });
    it('should work', async () => {
        const repository = new PrismaMensuellesRepository({ prisma });
        await saveCSVsToDB({
            directory: resolve(`${import.meta.dirname}/../../data-samples`),
            globber: glob,
            lineReader: readLines,
            repository,
        });
        expect(await getArrayFromAsyncGenerator(repository.getAll())).not.toHaveLength(0);
    });
});
