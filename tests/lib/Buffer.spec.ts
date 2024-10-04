import { Buffer } from '@/lib/Buffer.js';
import { describe, expect, it } from 'vitest';

describe('Buffer', () => {
    it('should work', () => {
        const chunks: number[][] = [];
        const buffer = new Buffer<number>({
            size: 2,
            onChunk: (buffer: number[]) => {
                chunks.push(buffer);
            },
        });
        buffer.add(1);
        expect(chunks).toEqual([]);
        buffer.add(2);
        expect(chunks).toEqual([[1, 2]]);
        buffer.add(3);
        expect(chunks).toEqual([[1, 2]]);
        buffer.flush();
        expect(chunks).toEqual([[1, 2], [3]]);
    });
});
