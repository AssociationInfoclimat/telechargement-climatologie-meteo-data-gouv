import { MensuelleDTO } from './DTO.js';

export interface MensuellesRepository {
    upsert(dto: MensuelleDTO): Promise<void>;

    getAll(): AsyncGenerator<MensuelleDTO>;
}
