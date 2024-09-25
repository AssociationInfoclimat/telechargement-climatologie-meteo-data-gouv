import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';

export class InMemoryQuotidiennesRepository implements QuotidiennesRepository {
    private readonly dtos: QuotidienneDTO[] = [];

    constructor({ dtos = [] }: { dtos?: QuotidienneDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: QuotidienneDTO): Promise<void> {
        const index = this.dtos.findIndex(d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJ === dto.AAAAMMJJ);
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async *getAll(): AsyncGenerator<QuotidienneDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
