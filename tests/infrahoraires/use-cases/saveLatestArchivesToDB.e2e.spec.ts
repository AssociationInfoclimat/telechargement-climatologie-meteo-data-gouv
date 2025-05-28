import { Departement } from '@/archives/departements/Departement.js';
import { PrismaInfrahorairesRepository } from '@/db/infrahoraires/PrismaRepository.js';
import { createDayGrepper } from '@/files/grep/createDayGrepper.js';
import { saveLatestInfrahorairesArchivesToDB } from '@/infrahoraires/use-cases/saveLatestArchivesToDB.js';
import { fileExists } from '@/lib/fs/file-exists/fileExists.node.js';
import { glob } from '@/lib/fs/glob/glob.glob.js';
import { grep } from '@/lib/fs/grep/grep.exec.js';
import { readLines } from '@/lib/fs/read-lines/readLines.node.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { gunzip } from '@/lib/unzip/gunzip.node.js';
import { FileSaveHistoryRepository } from '@/save-history/db/PrismaSaveHistoryRepository.js';
import { PrismaClient } from '@prisma/client';
import { rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { assert, beforeEach, describe, expect, it } from 'vitest';

describe('saveLatestArchivesToDB', () => {
    const prisma = new PrismaClient();
    beforeEach(async () => {
        await prisma.infrahoraire.deleteMany();
        await rm(`${import.meta.dirname}/save-history.txt`, { force: true });
    });
    it('should read all lines', async () => {
        const infrahorairesRepository = new PrismaInfrahorairesRepository({ prisma });
        const currentDate = new Date('2025-05-28T15:30:45Z');
        await writeFile(`${import.meta.dirname}/save-history.txt`, '2025-05-26T15:30:45Z');
        const saveHistoryRepository = new FileSaveHistoryRepository(`${import.meta.dirname}/save-history.txt`);
        await saveLatestInfrahorairesArchivesToDB({
            directory: resolve(`${import.meta.dirname}/data-samples`),
            globber: glob,
            fileExistenceChecker: fileExists,
            unzipper: gunzip,
            dateGrepper: createDayGrepper(grep, -1),
            lineReader: readLines,
            infrahorairesRepository,
            saveHistoryRepository,
            currentDate,
            departements: [Departement.of(1)],
        });
        const ingestionDate = await saveHistoryRepository.getLastSuccessfulIngestionDate();
        expect(Math.abs(ingestionDate!.getTime() - new Date().getTime())).toBeLessThan(60_000);
        assert.deepInclude(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll()), {
            NUM_POSTE: '01414001',
            NOM_USUEL: 'SUTRIEU',
            LAT: 45.916167,
            LON: 5.624667,
            ALTI: 878,
            AAAAMMJJHHMN: new Date('2025-05-25T01:00:00Z'),
            RR: 0.0,
            QRR: 9,
        });
        assert.deepInclude(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll()), {
            NUM_POSTE: '01414001',
            NOM_USUEL: 'SUTRIEU',
            LAT: 45.916167,
            LON: 5.624667,
            ALTI: 878,
            AAAAMMJJHHMN: new Date('2025-05-28T01:00:00Z'),
            RR: 0.0,
            QRR: 9,
        });
    });

    it('should only read the relevant line', async () => {
        const infrahorairesRepository = new PrismaInfrahorairesRepository({ prisma });
        const currentDate = new Date('2025-05-28T15:30:45Z');
        await writeFile(`${import.meta.dirname}/save-history.txt`, '2025-05-27T15:30:45Z');
        const saveHistoryRepository = new FileSaveHistoryRepository(`${import.meta.dirname}/save-history.txt`);
        await saveLatestInfrahorairesArchivesToDB({
            directory: resolve(`${import.meta.dirname}/data-samples`),
            globber: glob,
            fileExistenceChecker: fileExists,
            unzipper: gunzip,
            dateGrepper: createDayGrepper(grep),
            lineReader: readLines,
            infrahorairesRepository,
            saveHistoryRepository,
            currentDate,
            departements: [Departement.of(1)],
        });
        const ingestionDate = await saveHistoryRepository.getLastSuccessfulIngestionDate();
        expect(Math.abs(ingestionDate!.getTime() - new Date().getTime())).toBeLessThan(60_000);
        assert.notDeepInclude(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll()), {
            NUM_POSTE: '01414001',
            NOM_USUEL: 'SUTRIEU',
            LAT: 45.916167,
            LON: 5.624667,
            ALTI: 878,
            AAAAMMJJHHMN: new Date('2025-05-25T01:00:00Z'),
            RR: 0.0,
            QRR: 9,
        });
        assert.deepInclude(await getArrayFromAsyncGenerator(infrahorairesRepository.getAll()), {
            NUM_POSTE: '01414001',
            NOM_USUEL: 'SUTRIEU',
            LAT: 45.916167,
            LON: 5.624667,
            ALTI: 878,
            AAAAMMJJHHMN: new Date('2025-05-28T01:00:00Z'),
            RR: 0.0,
            QRR: 9,
        });
    });
});
