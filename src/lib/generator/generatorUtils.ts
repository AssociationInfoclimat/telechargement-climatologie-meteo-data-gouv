import { Result } from '@/lib/resultUtils.js';

export async function* getAsyncGeneratorFromArray<T>(array: T[]): AsyncGenerator<T> {
    for (const item of array) {
        yield item;
    }
}

export async function getArrayFromAsyncGenerator<T>(generator: AsyncGenerator<T>): Promise<T[]> {
    const array: T[] = [];
    for await (const item of generator) {
        array.push(item);
    }
    return array;
}

export async function getResultsArraysFromAsyncResultGenerator<T, E extends Error = Error>(
    generator: AsyncGenerator<Result<T, E>>
): Promise<{ ok: T[]; ko: E[] }> {
    const ok: T[] = [];
    const ko: E[] = [];
    for await (const item of generator) {
        if (item.ok) {
            ok.push(item.data);
        } else {
            ko.push(item.error);
        }
    }
    return { ok, ko };
}
