import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';
import { buildPrismaUpsertSQL } from '@/lib/sql/buildPrismaUpsertSQL.js';
import { PrismaClient } from '@prisma/client';

export class PrismaQuotidiennesAutresParametresRepository implements QuotidiennesAutresParametresRepository {
    private readonly prisma: PrismaClient;
    private readonly chunkSize: number;

    constructor({ prisma, chunkSize = 1000 }: { prisma: PrismaClient; chunkSize?: number }) {
        this.prisma = prisma;
        this.chunkSize = chunkSize;
    }

    async upsert(dto: QuotidienneAutresParametresDTO): Promise<void> {
        await this.prisma.quotidienneAutresParametres.upsert({
            create: dto,
            update: dto,
            where: {
                NUM_POSTE_AAAAMMJJ: {
                    NUM_POSTE: dto.NUM_POSTE,
                    AAAAMMJJ: dto.AAAAMMJJ,
                },
            },
        });
    }

    async upsertMany(dtos: QuotidienneAutresParametresDTO[]): Promise<void> {
        if (dtos.length <= 0) {
            return;
        }
        const upsertSQL = buildPrismaUpsertSQL(dtos, 'QuotidienneAutresParametres', ['NUM_POSTE', 'AAAAMMJJ']);
        await this.prisma.$queryRaw(upsertSQL);
    }

    async *getAll(): AsyncGenerator<QuotidienneAutresParametresDTO> {
        let skip = 0;
        while (true) {
            const records = await this.getChunk(skip);
            if (records.length === 0) {
                return;
            }
            skip += this.chunkSize;
            for (const record of records) {
                yield record;
            }
        }
    }

    private async getChunk(skip: number): Promise<QuotidienneAutresParametresDTO[]> {
        return this.prisma.quotidienneAutresParametres.findMany({ skip, take: this.chunkSize });
    }
}
