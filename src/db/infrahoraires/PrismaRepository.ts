import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { buildPrismaUpsertSQL } from '@/lib/sql/buildPrismaUpsertSQL.js';
import { PrismaClient } from '@prisma/client';

export class PrismaInfrahorairesRepository implements InfrahorairesRepository {
    private readonly prisma: PrismaClient;
    private readonly chunkSize: number;

    constructor({ prisma, chunkSize = 1000 }: { prisma: PrismaClient; chunkSize?: number }) {
        this.prisma = prisma;
        this.chunkSize = chunkSize;
    }

    async upsert(dto: InfrahoraireDTO): Promise<void> {
        await this.prisma.infrahoraire.upsert({
            create: dto,
            update: dto,
            where: {
                NUM_POSTE_AAAAMMJJHHMN: {
                    NUM_POSTE: dto.NUM_POSTE,
                    AAAAMMJJHHMN: dto.AAAAMMJJHHMN,
                },
            },
        });
    }

    async upsertMany(dtos: InfrahoraireDTO[]): Promise<void> {
        if (dtos.length <= 0) {
            return;
        }
        const upsertSQL = buildPrismaUpsertSQL(dtos, 'Infrahoraire', ['NUM_POSTE', 'AAAAMMJJHHMN']);
        await this.prisma.$queryRaw(upsertSQL);
    }

    async *getAll(): AsyncGenerator<InfrahoraireDTO> {
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

    private async getChunk(skip: number): Promise<InfrahoraireDTO[]> {
        return this.prisma.infrahoraire.findMany({ skip, take: this.chunkSize });
    }
}
