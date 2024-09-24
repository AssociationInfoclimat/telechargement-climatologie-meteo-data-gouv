import { DecadaireDTO } from './DTO.js';

export interface DecadairesRepository {
    upsert(dto: DecadaireDTO): Promise<void>;

    getAll(): AsyncGenerator<DecadaireDTO>;
}
