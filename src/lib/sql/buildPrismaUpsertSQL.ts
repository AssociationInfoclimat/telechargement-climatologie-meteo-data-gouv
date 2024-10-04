import { Prisma } from '@prisma/client';

export function buildPrismaUpsertSQL<T>(
    dtos: T[],
    tableName: string,
    conflictColumns: (keyof T & string)[]
): Prisma.Sql {
    const tableArg = Prisma.raw(`"${tableName}"`);

    const columns = Object.keys(dtos[0]!) as (keyof T & string)[];

    const values = dtos.map(dto => Prisma.sql`(${Prisma.join(columns.map(col => dto[col]))})`);

    const columnsArg = Prisma.raw(columns.map(c => `"${c}"`).join(','));

    const conflictArg = Prisma.raw(conflictColumns.map(c => `"${c}"`).join(','));

    const updateColumns = columns.filter(c => !conflictColumns.includes(c));
    const updateArg = Prisma.raw(updateColumns.map(c => `"${c}" = EXCLUDED."${c}"`).join(',\n'));

    return Prisma.sql`
        INSERT INTO ${tableArg} (${columnsArg})
        VALUES
        ${Prisma.join(values)}
        ON CONFLICT (
        ${conflictArg}
        )
        DO UPDATE SET
        ${updateArg};
    `;
}
