import { HoraireDTO } from './DTO.js';

export interface HorairesRepository {
    upsert(dto: HoraireDTO): Promise<void>;

    upsertMany(dtos: HoraireDTO[]): Promise<void>;

    getAll(): AsyncGenerator<HoraireDTO>;
}
