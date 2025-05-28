import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { Grepper } from '@/lib/fs/grep/Grepper.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

function getYYYYMMDD(date: Date): string {
    return date.toISOString().replace(/-/g, '').slice(0, 'YYYYMMDD'.length);
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function generateDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(getYYYYMMDD(currentDate));
        currentDate = addDays(currentDate, 1);
    }

    return dates;
}

export function createDayGrepper(grep: Grepper, startOffset: number = 0): DateGrepper {
    return ({ sourceFile, targetFile, startDate, endDate }) => {
        startDate = addDays(startDate, startOffset);
        LoggerSingleton.getSingleton().info({
            message: `Grepping dates '${getYYYYMMDD(startDate)}-${getYYYYMMDD(endDate)}' in '${sourceFile}' to '${targetFile}'`,
        });
        const datePatterns = generateDateRange(startDate, endDate);
        return grep(datePatterns, sourceFile, targetFile);
    };
}
