import { QuotidienneDTO } from './DTO.js';

export interface QuotidiennesRepository {
    upsert(dto: QuotidienneDTO): Promise<void>;

    upsertMany(dtos: QuotidienneDTO[]): Promise<void>;

    getAll(): AsyncGenerator<QuotidienneDTO>;
}
