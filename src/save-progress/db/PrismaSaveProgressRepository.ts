import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { PrismaClient } from '@prisma/client';

export class PrismaSaveProgressRepository implements SaveProgressRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getAlreadySaved(): Promise<string[]> {
        const saved = await this.prisma.saveProgress.findMany({ select: { name: true } });
        return saved.map(({ name }) => name);
    }

    async markAsSaved(name: string): Promise<void> {
        await this.prisma.saveProgress.upsert({
            create: { name },
            update: { name },
            where: { name },
        });
    }
}
