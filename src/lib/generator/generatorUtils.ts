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
