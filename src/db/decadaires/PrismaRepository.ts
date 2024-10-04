import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { buildPrismaUpsertSQL } from '@/lib/sql/buildPrismaUpsertSQL.js';
import { PrismaClient } from '@prisma/client';

export class PrismaDecadairesRepository implements DecadairesRepository {
    private readonly prisma: PrismaClient;
    private readonly chunkSize: number;

    constructor({ prisma, chunkSize = 1000 }: { prisma: PrismaClient; chunkSize?: number }) {
        this.prisma = prisma;
        this.chunkSize = chunkSize;
    }

    async upsert(dto: DecadaireDTO): Promise<void> {
        await this.prisma.decadaire.upsert({
            create: dto,
            update: dto,
            where: {
                NUM_POSTE_AAAAMM_NUM_DECADE: {
                    NUM_POSTE: dto.NUM_POSTE,
                    AAAAMM: dto.AAAAMM,
                    NUM_DECADE: dto.NUM_DECADE,
                },
            },
        });
    }

    async upsertMany(dtos: DecadaireDTO[]): Promise<void> {
        if (dtos.length <= 0) {
            return;
        }
        const upsertSQL = buildPrismaUpsertSQL(dtos, 'Decadaire', ['NUM_POSTE', 'AAAAMM', 'NUM_DECADE']);
        await this.prisma.$queryRaw(upsertSQL);
    }

    async *getAll(): AsyncGenerator<DecadaireDTO> {
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

    private async getChunk(skip: number): Promise<DecadaireDTO[]> {
        return this.prisma.decadaire.findMany({ skip, take: this.chunkSize });
    }
}
