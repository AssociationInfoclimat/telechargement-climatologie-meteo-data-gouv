import { HoraireDTO } from './DTO.js';

export interface HorairesRepository {
    upsert(dto: HoraireDTO): Promise<void>;

    getAll(): AsyncGenerator<HoraireDTO>;
}
