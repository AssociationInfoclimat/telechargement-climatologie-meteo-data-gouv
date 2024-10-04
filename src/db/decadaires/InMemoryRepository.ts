import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';

export class InMemoryDecadairesRepository implements DecadairesRepository {
    private readonly dtos: DecadaireDTO[] = [];

    constructor({ dtos = [] }: { dtos?: DecadaireDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: DecadaireDTO): Promise<void> {
        const index = this.dtos.findIndex(
            d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMM === dto.AAAAMM && d.NUM_DECADE === dto.NUM_DECADE
        );
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async upsertMany(dtos: DecadaireDTO[]): Promise<void> {
        for (const dto of dtos) {
            await this.upsert(dto);
        }
    }

    async *getAll(): AsyncGenerator<DecadaireDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
