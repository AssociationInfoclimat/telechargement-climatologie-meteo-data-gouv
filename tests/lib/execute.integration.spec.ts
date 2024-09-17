import { execute } from '@/lib/execute.js';

import { describe, expect, it } from 'vitest';

describe('execute', () => {
    describe('stdout', () => {
        it('should execute the command and return the result', async () => {
            const { stdout, stderr } = await execute('pwd');
            expect(stdout).toEqual(`${process.cwd()}\n`);
            expect(stderr).toEqual('');
        });
    });
    describe('error', () => {
        it('should fail and return the error', async () => {
            expect(() => execute('pwdd')).rejects.toThrow(Error);
        });
    });
});
