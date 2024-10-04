import { InfrahoraireDTO } from './DTO.js';

export interface InfrahorairesRepository {
    upsert(dto: InfrahoraireDTO): Promise<void>;

    upsertMany(dtos: InfrahoraireDTO[]): Promise<void>;

    getAll(): AsyncGenerator<InfrahoraireDTO>;
}
