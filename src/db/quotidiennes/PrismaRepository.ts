import { QuotidienneDTO } from '@/db/quotidiennes/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/Repository.js';
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
