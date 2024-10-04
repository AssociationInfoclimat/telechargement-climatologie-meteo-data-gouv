import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { buildPrismaUpsertSQL } from '@/lib/sql/buildPrismaUpsertSQL.js';
import { PrismaClient } from '@prisma/client';

export class PrismaHorairesRepository implements HorairesRepository {
    private readonly prisma: PrismaClient;
    private readonly chunkSize: number;

    constructor({ prisma, chunkSize = 1000 }: { prisma: PrismaClient; chunkSize?: number }) {
        this.prisma = prisma;
        this.chunkSize = chunkSize;
    }

    async upsert(dto: HoraireDTO): Promise<void> {
        await this.prisma.horaire.upsert({
            create: dto,
            update: dto,
            where: {
                NUM_POSTE_AAAAMMJJHH: {
                    NUM_POSTE: dto.NUM_POSTE,
                    AAAAMMJJHH: dto.AAAAMMJJHH,
                },
            },
        });
    }

    async upsertMany(dtos: HoraireDTO[]): Promise<void> {
        if (dtos.length <= 0) {
            return;
        }
        const upsertSQL = buildPrismaUpsertSQL(dtos, 'Horaire', ['NUM_POSTE', 'AAAAMMJJHH']);
        await this.prisma.$queryRaw(upsertSQL);
    }

    async *getAll(): AsyncGenerator<HoraireDTO> {
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

    private async getChunk(skip: number): Promise<HoraireDTO[]> {
        return this.prisma.horaire.findMany({ skip, take: this.chunkSize });
    }
}
