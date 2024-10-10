import { InMemoryRepository } from '@/db/InMemoryRepository.js';
import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { QuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/Repository.js';

export class InMemoryQuotidiennesRepository
    extends InMemoryRepository<QuotidienneDTO>
    implements QuotidiennesRepository
{
    constructor({ dtos = [] }: { dtos?: QuotidienneDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJ === dto.AAAAMMJJ,
        });
    }
}
