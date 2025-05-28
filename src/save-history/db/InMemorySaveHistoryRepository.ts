import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';

export class InMemorySaveHistoryRepository implements SaveHistoryRepository {
    private saved: Date | null = null;
    private readonly currentDate: Date;

    constructor({ saved = null, currentDate }: { saved?: Date | null; currentDate: Date }) {
        this.saved = saved;
        this.currentDate = currentDate;
    }

    async updateLastSuccessfulIngestionDate(): Promise<void> {
        this.saved = this.currentDate;
        return;
    }

    async getLastSuccessfulIngestionDate(): Promise<Date | null> {
        return this.saved;
    }
}
