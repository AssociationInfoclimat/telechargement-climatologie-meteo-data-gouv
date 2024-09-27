import { PrismaQuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/PrismaRepository.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { saveCSVsToDB } from '@/quotidiennes/autres-parametres/use-cases/saveCSVsToDB.js';
import { PrismaSaveProgressRepository } from '@/save-progress/db/PrismaSaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

describe('saveCSVsToDB', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.quotidienneAutresParametres.deleteMany();
        await prisma.saveProgress.deleteMany();
    });
    it('should work', async () => {
        const quotidiennesAutresParametresRepository = new PrismaQuotidiennesAutresParametresRepository({ prisma });
        const saveProgressRepository = new PrismaSaveProgressRepository(prisma);
        await saveCSVsToDB({
            directory: resolve(`${import.meta.dirname}/../../../data-samples`),
            globber: glob,
            lineReader: readLines,
            quotidiennesAutresParametresRepository,
            saveProgressRepository,
        });
        expect(await getArrayFromAsyncGenerator(quotidiennesAutresParametresRepository.getAll())).not.toHaveLength(0);
        expect(await saveProgressRepository.getAlreadySaved()).not.toHaveLength(0);
    });
});
