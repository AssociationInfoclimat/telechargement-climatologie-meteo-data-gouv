import { HoraireDTO } from '@/db/horaires/DTO.js';
import { HorairesRepository } from '@/db/horaires/Repository.js';
import { InMemoryRepository } from '@/db/InMemoryRepository.js';

export class InMemoryHorairesRepository extends InMemoryRepository<HoraireDTO> implements HorairesRepository {
    constructor({ dtos = [] }: { dtos?: HoraireDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJHH === dto.AAAAMMJJHH,
        });
    }
}
