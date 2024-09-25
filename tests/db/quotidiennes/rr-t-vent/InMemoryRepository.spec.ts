import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';
import { InMemoryQuotidiennesRepository } from '@/db/quotidiennes/rr-t-vent/InMemoryRepository.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { describe, expect, it } from 'vitest';

export const dto1: QuotidienneDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMMJJ: new Date('2023-01-01T00:00:00Z'),
    RR: 0.0,
    QRR: 1,
    TN: 11.6,
    QTN: 1,
    HTN: '0115',
    QHTN: 9,
    TX: 17.7,
    QTX: 1,
    HTX: '1123',
    QHTX: 9,
    TM: 14.3,
    QTM: 1,
    TNTXM: 14.7,
    QTNTXM: 1,
    TAMPLI: 6.1,
    QTAMPLI: 1,
    TNSOL: null,
    QTNSOL: null,
    TN50: null,
    QTN50: null,
    DG: 0,
    QDG: 9,
    FFM: 4.8,
    QFFM: 1,
    FF2M: null,
    QFF2M: null,
    FXY: 6.8,
    QFXY: 1,
    DXY: 160,
    QDXY: 1,
    HXY: '0947',
    QHXY: 9,
    FXI: 14.8,
    QFXI: 1,
    DXI: 200,
    QDXI: 9,
    HXI: '1943',
    QHXI: 9,
    FXI2: null,
    QFXI2: null,
    DXI2: null,
    QDXI2: null,
    HXI2: null,
    QHXI2: null,
    FXI3S: 13.6,
    QFXI3S: 9,
    DXI3S: null,
    QDXI3S: null,
    HXI3S: '1135',
    QHXI3S: 9,
    DRR: null,
    QDRR: null,
};

export const dto2: QuotidienneDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMMJJ: new Date('2023-01-02T00:00:00Z'),
    RR: 11.0,
    QRR: 1,
    TN: 8.6,
    QTN: 1,
    HTN: '1746',
    QHTN: 9,
    TX: 14.3,
    QTX: 1,
    HTX: '0846',
    QHTX: 9,
    TM: 11.5,
    QTM: 1,
    TNTXM: 11.5,
    QTNTXM: 1,
    TAMPLI: 5.7,
    QTAMPLI: 1,
    TNSOL: null,
    QTNSOL: null,
    TN50: null,
    QTN50: null,
    DG: 0,
    QDG: 9,
    FFM: 3.0,
    QFFM: 1,
    FF2M: null,
    QFF2M: null,
    FXY: 6.3,
    QFXY: 1,
    DXY: 200,
    QDXY: 1,
    HXY: '1001',
    QHXY: 9,
    FXI: 14.4,
    QFXI: 1,
    DXI: 180,
    QDXI: 1,
    HXI: '0954',
    QHXI: 9,
    FXI2: null,
    QFXI2: null,
    DXI2: null,
    QDXI2: null,
    HXI2: null,
    QHXI2: null,
    FXI3S: 12.0,
    QFXI3S: 9,
    DXI3S: null,
    QDXI3S: null,
    HXI3S: '0955',
    QHXI3S: 9,
    DRR: null,
    QDRR: null,
};

describe('InMemoryQuotidiennesRepository', () => {
    describe('upsert', () => {
        it('should upsert', async () => {
            const repository = new InMemoryQuotidiennesRepository({ dtos: [] });

            await repository.upsert(dto1);
            await repository.upsert(dto2);
            const dtos1 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos1).toEqual([dto1, dto2]);

            const modifiedDto1: QuotidienneDTO = {
                ...dto1,
                QDRR: 1,
            };

            await repository.upsert(modifiedDto1);
            const dtos2 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos2).toEqual([modifiedDto1, dto2]);
        });
    });
});
