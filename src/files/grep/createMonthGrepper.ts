import { DateGrepper } from '@/files/grep/DateGrepper.js';
import { Grepper } from '@/lib/fs/grep/Grepper.js';
import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';

function getYYYYMM(date: Date): string {
    return date.toISOString().replace(/-/g, '').slice(0, 'YYYYMM'.length);
}

function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function generateDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(getYYYYMM(currentDate));
        currentDate = addMonths(currentDate, 1);
    }

    return dates;
}

export function createMonthGrepper(grep: Grepper, startOffset: number = 0): DateGrepper {
    return ({ sourceFile, targetFile, startDate, endDate }) => {
        startDate = addMonths(startDate, startOffset);
        LoggerSingleton.getSingleton().info({
            message: `Grepping dates '${getYYYYMM(startDate)}-${getYYYYMM(endDate)}' in '${sourceFile}' to '${targetFile}'`,
        });
        const datePatterns = generateDateRange(startDate, endDate);
        return grep(datePatterns, sourceFile, targetFile);
    };
}
