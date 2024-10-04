import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';

export class InMemoryDecadairesAgroRepository implements DecadairesAgroRepository {
    private readonly dtos: DecadaireAgroDTO[] = [];

    constructor({ dtos = [] }: { dtos?: DecadaireAgroDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: DecadaireAgroDTO): Promise<void> {
        const index = this.dtos.findIndex(
            d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMM === dto.AAAAMM && d.NUM_DECADE === dto.NUM_DECADE
        );
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async upsertMany(dtos: DecadaireAgroDTO[]): Promise<void> {
        for (const dto of dtos) {
            await this.upsert(dto);
        }
    }

    async *getAll(): AsyncGenerator<DecadaireAgroDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
