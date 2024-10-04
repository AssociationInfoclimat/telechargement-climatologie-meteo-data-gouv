import { buildPrismaUpsertSQL } from '@/lib/sql/buildPrismaUpsertSQL.js';
import { describe, expect, it } from 'vitest';

describe.skip('buildPrismaUpsertSQL', () => {
    it('should build the upsert statement', () => {
        expect(
            buildPrismaUpsertSQL(
                [
                    { id_1: 1, id_2: 10, A: 'a', B: 1, C: new Date('2000-06-15T12:30:45Z') },
                    { id_1: 2, id_2: 20, A: 'aa', B: 2, C: new Date('2001-07-16T13:35:50Z') },
                ],
                'Table',
                ['id_1', 'id_2']
            ).inspect()
        ).toEqual('');
    });
});
