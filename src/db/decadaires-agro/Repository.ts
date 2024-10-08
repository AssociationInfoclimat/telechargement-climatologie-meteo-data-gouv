import { DecadaireAgroDTO } from './DTO.js';

export interface DecadairesAgroRepository {
    upsert(dto: DecadaireAgroDTO): Promise<void>;

    upsertMany(dtos: DecadaireAgroDTO[]): Promise<void>;

    getAll(): AsyncGenerator<DecadaireAgroDTO>;
}
