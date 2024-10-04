import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';

export class InMemoryHorairesRepository implements HorairesRepository {
    private readonly dtos: HoraireDTO[] = [];

    constructor({ dtos = [] }: { dtos?: HoraireDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: HoraireDTO): Promise<void> {
        const index = this.dtos.findIndex(d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJHH === dto.AAAAMMJJHH);
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async upsertMany(dtos: HoraireDTO[]): Promise<void> {
        for (const dto of dtos) {
            await this.upsert(dto);
        }
    }

    async *getAll(): AsyncGenerator<HoraireDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
