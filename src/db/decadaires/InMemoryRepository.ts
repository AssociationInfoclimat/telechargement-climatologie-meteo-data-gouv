import { DecadaireDTO } from '@/db/decadaires/DTO.js';
import { DecadairesRepository } from '@/db/decadaires/Repository.js';
import { InMemoryRepository } from '@/db/InMemoryRepository.js';

export class InMemoryDecadairesRepository extends InMemoryRepository<DecadaireDTO> implements DecadairesRepository {
    constructor({ dtos = [] }: { dtos?: DecadaireDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) =>
                d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMM === dto.AAAAMM && d.NUM_DECADE === dto.NUM_DECADE,
        });
    }
}
