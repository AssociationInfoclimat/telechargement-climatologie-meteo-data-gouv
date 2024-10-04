import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';

export class InMemoryQuotidiennesAutresParametresRepository implements QuotidiennesAutresParametresRepository {
    private readonly dtos: QuotidienneAutresParametresDTO[] = [];

    constructor({ dtos = [] }: { dtos?: QuotidienneAutresParametresDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: QuotidienneAutresParametresDTO): Promise<void> {
        const index = this.dtos.findIndex(d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJ === dto.AAAAMMJJ);
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async upsertMany(dtos: QuotidienneAutresParametresDTO[]): Promise<void> {
        for (const dto of dtos) {
            await this.upsert(dto);
        }
    }

    async *getAll(): AsyncGenerator<QuotidienneAutresParametresDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
