import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';

export class InMemoryMensuellesRepository implements MensuellesRepository {
    private readonly dtos: MensuelleDTO[] = [];

    constructor({ dtos = [] }: { dtos?: MensuelleDTO[] } = {}) {
        this.dtos = dtos;
    }

    async upsert(dto: MensuelleDTO): Promise<void> {
        const index = this.dtos.findIndex(d => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMM === dto.AAAAMM);
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async *getAll(): AsyncGenerator<MensuelleDTO> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
