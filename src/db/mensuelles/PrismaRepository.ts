import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';
import { PrismaClient } from '@prisma/client';

export class PrismaMensuellesRepository implements MensuellesRepository {
    private readonly prisma: PrismaClient;
    private readonly chunkSize: number;

    constructor({ prisma, chunkSize = 1000 }: { prisma: PrismaClient; chunkSize?: number }) {
        this.prisma = prisma;
        this.chunkSize = chunkSize;
    }

    async upsert(dto: MensuelleDTO): Promise<void> {
        await this.prisma.mensuelle.upsert({
            create: dto,
            update: dto,
            where: {
                NUM_POSTE_AAAAMM: {
                    NUM_POSTE: dto.NUM_POSTE,
                    AAAAMM: dto.AAAAMM,
                },
            },
        });
    }

    async *getAll(): AsyncGenerator<MensuelleDTO> {
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

    private async getChunk(skip: number): Promise<MensuelleDTO[]> {
        return this.prisma.mensuelle.findMany({ skip, take: this.chunkSize });
    }
}
