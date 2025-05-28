export interface SaveHistoryRepository {
    updateLastSuccessfulIngestionDate(): Promise<void>;

    getLastSuccessfulIngestionDate(): Promise<Date | null>;
}
