import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';
import { InfrahorairesRepository } from '@/db/infrahoraires/Repository.js';
import { InMemoryRepository } from '@/db/InMemoryRepository.js';

export class InMemoryInfrahorairesRepository
    extends InMemoryRepository<InfrahoraireDTO>
    implements InfrahorairesRepository
{
    constructor({ dtos = [] }: { dtos?: InfrahoraireDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJHHMN === dto.AAAAMMJJHHMN,
        });
    }
}
