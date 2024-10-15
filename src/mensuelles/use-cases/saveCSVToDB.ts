import { createReadingLineDebugMessage, MensuelleLine, parseMensuelleCSV } from '@/csv/mensuelles/parseCSV.js';
import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { MensuellesRepository } from '@/db/mensuelles/Repository.js';
import { toDTO } from '@/db/mensuelles/toDTO.js';
import { LineReader } from '@/lib/fs/read-lines/LineReader.js';
import { SaveProgressRepository } from '@/save-progress/db/SaveProgressRepository.js';
import { saveCSVToDB } from '@/use-cases/saveCSVToDB.js';
import PQueue from 'p-queue';

export async function saveMensuellesCSVToDB({
    csv,
    readLines,
    mensuellesRepository,
    saveProgressRepository,
    queue,
    deleteCSV,
}: {
    csv: string;
    readLines: LineReader;
    mensuellesRepository: MensuellesRepository;
    saveProgressRepository: SaveProgressRepository;
    queue?: PQueue;
    deleteCSV?: (csv: string) => Promise<void>;
}): Promise<void> {
    await saveCSVToDB<MensuelleLine, MensuelleDTO>({
        csv,
        readLines,
        lineReadingDebugMessageCreator: createReadingLineDebugMessage,
        parseCSV: parseMensuelleCSV,
        toDTO,
        frequencesRepository: mensuellesRepository,
        saveProgressRepository,
        queue,
        deleteCSV,
    });
}
