import { PrismaQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/PrismaRepository.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { saveCSVsToDB } from '@/quotidiennes/rr-t-vent/use-cases/saveCSVsToDB.js';
import { PrismaClient } from '@prisma/client';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

describe('saveCSVsToDB', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.quotidienne.deleteMany();
    });
    it('should work', async () => {
        const repository = new PrismaQuotidiennesRepository({ prisma });
        await saveCSVsToDB({
            directory: resolve(`${import.meta.dirname}/../../../data-samples`),
            globber: glob,
            lineReader: readLines,
            repository,
        });
        expect(await getArrayFromAsyncGenerator(repository.getAll())).not.toHaveLength(0);
    });
});
