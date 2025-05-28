import { SaveHistoryRepository } from '@/save-history/db/SaveHistoryRepository.js';
import { readFile, writeFile } from 'node:fs/promises';

export class FileSaveHistoryRepository implements SaveHistoryRepository {
    private readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    static async getInstance(path: string): Promise<FileSaveHistoryRepository> {
        const instance = new FileSaveHistoryRepository(path);
        await instance.initializeFile();
        return instance;
    }

    updateLastSuccessfulIngestionDate(): Promise<void> {
        return writeFile(this.path, new Date().toISOString(), 'utf-8');
    }

    async getLastSuccessfulIngestionDate(): Promise<Date | null> {
        const content = await readFile(this.path, 'utf-8');
        if (!content.trim()) {
            return null;
        }
        const parsed = new Date(content.trim());
        return isNaN(parsed.getTime()) ? null : parsed;
    }

    private async initializeFile(): Promise<void> {
        try {
            await readFile(this.path, 'utf-8');
        } catch (error) {
            if (!(error instanceof Error) || !('code' in error) || error['code'] !== 'ENOENT') {
                throw error;
            }
            await writeFile(this.path, '', 'utf-8');
        }
    }
}
