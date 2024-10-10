import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';
import { DecadairesAgroRepository } from '@/db/decadaires-agro/Repository.js';
import { InMemoryRepository } from '@/db/InMemoryRepository.js';

export class InMemoryDecadairesAgroRepository
    extends InMemoryRepository<DecadaireAgroDTO>
    implements DecadairesAgroRepository
{
    constructor({ dtos = [] }: { dtos?: DecadaireAgroDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) =>
                d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMM === dto.AAAAMM && d.NUM_DECADE === dto.NUM_DECADE,
        });
    }
}
