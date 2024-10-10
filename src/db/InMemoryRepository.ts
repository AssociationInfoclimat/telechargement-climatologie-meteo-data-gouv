import { FrequenceRepository } from '@/db/Repository.js';

export type DTOEqualityChecker<T> = (dto: T, other: T) => boolean;

export class InMemoryRepository<T> implements FrequenceRepository<T> {
    private readonly dtos: T[] = [];
    private readonly dtoEqualityChecker: DTOEqualityChecker<T>;

    constructor({ dtos = [], dtoEqualityChecker }: { dtos?: T[]; dtoEqualityChecker: DTOEqualityChecker<T> }) {
        this.dtos = dtos;
        this.dtoEqualityChecker = dtoEqualityChecker;
    }

    async upsert(dto: T): Promise<void> {
        const index = this.dtos.findIndex(d => this.dtoEqualityChecker(dto, d));
        if (index === -1) {
            this.dtos.push(dto);
        } else {
            this.dtos[index] = dto;
        }
    }

    async upsertMany(dtos: T[]): Promise<void> {
        for (const dto of dtos) {
            await this.upsert(dto);
        }
    }

    async *getAll(): AsyncGenerator<T> {
        for (const dto of this.dtos) {
            yield dto;
        }
    }
}
