import { QuotidienneAutresParametresDTO } from './DTO.js';

export interface QuotidiennesAutresParametresRepository {
    upsert(dto: QuotidienneAutresParametresDTO): Promise<void>;

    upsertMany(dtos: QuotidienneAutresParametresDTO[]): Promise<void>;

    getAll(): AsyncGenerator<QuotidienneAutresParametresDTO>;
}
