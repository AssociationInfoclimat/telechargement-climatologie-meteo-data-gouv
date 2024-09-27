export interface SaveProgressRepository {
    getAlreadySaved(): Promise<string[]>;

    markAsSaved(name: string): Promise<void>;
}
