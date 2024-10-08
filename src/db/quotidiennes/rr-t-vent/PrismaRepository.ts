import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';
import { buildPrismaUpsertSQL } from '@/lib/sql/buildPrismaUpsertSQL.js';
import { PrismaClient } from '@prisma/client';

export class PrismaQuotidiennesRepository implements QuotidiennesRepository {
    private readonly prisma: PrismaClient;
    private readonly chunkSize: number;

    constructor({ prisma, chunkSize = 1000 }: { prisma: PrismaClient; chunkSize?: number }) {
        this.prisma = prisma;
        this.chunkSize = chunkSize;
    }

    async upsert(dto: QuotidienneDTO): Promise<void> {
        await this.prisma.quotidienne.upsert({
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

    async upsertMany(dtos: QuotidienneDTO[]): Promise<void> {
        if (dtos.length <= 0) {
            return;
        }
        const upsertSQL = buildPrismaUpsertSQL(dtos, 'Quotidienne', ['NUM_POSTE', 'AAAAMMJJ']);
        await this.prisma.$queryRaw(upsertSQL);
    }

    async *getAll(): AsyncGenerator<QuotidienneDTO> {
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

    private async getChunk(skip: number): Promise<QuotidienneDTO[]> {
        return this.prisma.quotidienne.findMany({ skip, take: this.chunkSize });
    }
}
