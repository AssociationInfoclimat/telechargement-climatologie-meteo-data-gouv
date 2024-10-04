import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';

export class InMemoryInfrahorairesRepository implements InfrahorairesRepository {
    private readonly dtos: InfrahoraireDTO[] = [];

    constructor({ dtos = [] }: { dtos?: InfrahoraireDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: InfrahoraireDTO): Promise<void> {
        const index = this.dtos.findIndex(d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJHHMN === dto.AAAAMMJJHHMN);
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async upsertMany(dtos: InfrahoraireDTO[]): Promise<void> {
        for (const dto of dtos) {
            await this.upsert(dto);
        }
    }

    async *getAll(): AsyncGenerator<InfrahoraireDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
