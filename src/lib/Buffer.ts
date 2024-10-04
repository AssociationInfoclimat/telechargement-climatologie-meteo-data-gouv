export class Buffer<T> {
    private readonly size: number;
    private buffer: T[] = [];
    private readonly onChunk: (chunk: T[]) => void;

    constructor({ size = 100, onChunk }: { size?: number; onChunk: (chunk: T[]) => void }) {
        this.size = size;
        this.onChunk = onChunk;
    }

    add(element: T): void {
        this.buffer.push(element);
        if (this.buffer.length >= this.size) {
            this.flush();
        }
    }

    flush(): void {
        if (this.buffer.length > 0) {
            this.onChunk(this.buffer);
            this.buffer = [];
        }
    }
}
