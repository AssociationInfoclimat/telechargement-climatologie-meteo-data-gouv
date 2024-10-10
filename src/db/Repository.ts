export interface FrequenceRepository<T> {
    upsert(dto: T): Promise<void>;

    upsertMany(dtos: T[]): Promise<void>;

    getAll(): AsyncGenerator<T>;
}
