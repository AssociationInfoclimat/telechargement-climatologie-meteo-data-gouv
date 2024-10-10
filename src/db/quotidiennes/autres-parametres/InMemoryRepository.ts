import { InMemoryRepository } from '@/db/InMemoryRepository.js';
import { QuotidienneAutresParametresDTO } from '@/db/quotidiennes/autres-parametres/DTO.js';
import { QuotidiennesAutresParametresRepository } from '@/db/quotidiennes/autres-parametres/Repository.js';

export class InMemoryQuotidiennesAutresParametresRepository
    extends InMemoryRepository<QuotidienneAutresParametresDTO>
    implements QuotidiennesAutresParametresRepository
{
    constructor({ dtos = [] }: { dtos?: QuotidienneAutresParametresDTO[] } = {}) {
        super({
            dtos,
            dtoEqualityChecker: (dto, d) => d.NUM_POSTE === dto.NUM_POSTE && d.AAAAMMJJ === dto.AAAAMMJJ,
        });
    }
}
