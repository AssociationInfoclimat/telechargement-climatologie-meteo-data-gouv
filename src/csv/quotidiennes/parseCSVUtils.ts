import { createTransform } from '@/lib/createTransform.js';
import { z } from 'zod';

export function parseDate(date: string): Date {
    const yyyy = date.slice(''.length, 'YYYY'.length);
    const mm = date.slice('YYYY'.length, 'YYYYMM'.length);
    const dd = date.slice('YYYYMM'.length, 'YYYYMMDD'.length);
    return new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`);
}

export const toDate = createTransform(parseDate);
export const DateSchema = z.string().transform(toDate);
