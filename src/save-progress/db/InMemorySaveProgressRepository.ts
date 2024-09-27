import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';

export class InMemorySaveProgressRepository implements SaveProgressRepository {
    private readonly saved: Set<string> = new Set();

    constructor(saved: string[] = []) {
        this.saved = new Set(saved);
    }

    async getAlreadySaved(): Promise<string[]> {
        return Array.from(this.saved);
    }

    async markAsSaved(name: string): Promise<void> {
        this.saved.add(name);
    }
}
