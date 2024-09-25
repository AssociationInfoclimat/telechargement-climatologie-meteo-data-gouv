import { QuotidienneAutresParametresDTO } from './DTO.js';

export interface QuotidiennesAutresParametresRepository {
    upsert(dto: QuotidienneAutresParametresDTO): Promise<void>;

    getAll(): AsyncGenerator<QuotidienneAutresParametresDTO>;
}
