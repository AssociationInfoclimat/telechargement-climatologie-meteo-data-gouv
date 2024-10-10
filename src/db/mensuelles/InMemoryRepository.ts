import { InMemoryRepository } from '@/db/InMemoryRepository.js';
import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';

export class InMemoryMensuellesRepository extends InMemoryRepository<MensuelleDTO> implements MensuellesRepository {
    constructor({ dtos = [] }: { dtos?: MensuelleDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMM === dto.AAAAMM,
        });
    }
}
