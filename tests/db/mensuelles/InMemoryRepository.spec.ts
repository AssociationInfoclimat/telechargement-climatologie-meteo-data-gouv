import { MensuelleDTO } from '@/db/mensuelles/DTO.js';
import { InMemoryMensuellesRepository } from '@/db/mensuelles/InMemoryRepository.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { describe, expect, it } from 'vitest';

export const dto1: MensuelleDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMM: new Date('2023-03-01T00:00:00Z'),
    RR: 1.1,
    QRR: 9,
    NBRR: 31,
    RR_ME: 1.1,
    RRAB: 1.1,
    QRRAB: 9,
    RRABDAT: 15,
    NBJRR1: 31,
    NBJRR5: 31,
    NBJRR10: 31,
    NBJRR30: 31,
    NBJRR50: 31,
    NBJRR100: 31,
    PMERM: 1.1,
    QPMERM: 9,
    NBPMERM: 31,
    PMERMINAB: 1.1,
    QPMERMINAB: 9,
    PMERMINABDAT: 15,
    TX: 1.1,
    QTX: 9,
    NBTX: 31,
    TX_ME: -2.2,
    TXAB: -2.2,
    QTXAB: 9,
    TXDAT: 15,
    TXMIN: -2.2,
    QTXMIN: 9,
    TXMINDAT: 15,
    NBJTX0: 31,
    NBJTX25: 31,
    NBJTX30: 31,
    NBJTX35: 31,
    NBJTXI20: 31,
    NBJTXI27: 31,
    NBJTXS32: 31,
    TN: -2.2,
    QTN: 9,
    NBTN: 31,
    TN_ME: -2.2,
    TNAB: -2.2,
    QTNAB: 9,
    TNDAT: 15,
    TNMAX: -2.2,
    QTNMAX: 9,
    TNMAXDAT: 15,
    NBJTN5: 31,
    NBJTN10: 31,
    NBJTNI10: 31,
    NBJTNI15: 31,
    NBJTNI20: 31,
    NBJTNS20: 31,
    NBJTNS25: 31,
    NBJGELEE: 31,
    TAMPLIM: 1.1,
    QTAMPLIM: 9,
    TAMPLIAB: 1.1,
    QTAMPLIAB: 9,
    TAMPLIABDAT: 15,
    NBTAMPLI: 31,
    TM: -2.2,
    QTM: 9,
    NBTM: 31,
    TMM: -2.2,
    QTMM: 9,
    NBTMM: 31,
    NBJTMS24: 31,
    TMMIN: -2.2,
    QTMMIN: 9,
    TMMINDAT: 15,
    TMMAX: -2.2,
    QTMMAX: 9,
    TMMAXDAT: 15,
    UNAB: 100,
    QUNAB: 9,
    UNABDAT: 15,
    NBUN: 31,
    UXAB: 100,
    QUXAB: 9,
    UXABDAT: 15,
    NBUX: 31,
    UMM: 100,
    QUMM: 9,
    NBUM: 31,
    TSVM: 1.1,
    QTSVM: 9,
    NBTSVM: 31,
    ETP: 1.1,
    QETP: 9,
    FXIAB: 1.1,
    QFXIAB: 9,
    DXIAB: 360,
    QDXIAB: 9,
    FXIDAT: 15,
    NBJFF10: 31,
    NBJFF16: 31,
    NBJFF28: 31,
    NBFXI: 31,
    FXI3SAB: 1.1,
    QFXI3SAB: 9,
    DXI3SAB: 360,
    QDXI3SAB: 9,
    FXI3SDAT: 15,
    NBJFXI3S10: 31,
    NBJFXI3S16: 31,
    NBJFXI3S28: 31,
    NBFXI3S: 31,
    FXYAB: 1.1,
    QFXYAB: 9,
    DXYAB: 360,
    QDXYAB: 9,
    FXYABDAT: 15,
    NBJFXY8: 31,
    NBJFXY10: 31,
    NBJFXY15: 31,
    NBFXY: 31,
    FFM: 1.1,
    QFFM: 9,
    NBFFM: 31,
    INST: 3,
    QINST: 9,
    NBINST: 31,
    NBSIGMA0: 31,
    NBSIGMA20: 31,
    NBSIGMA80: 31,
    GLOT: 3,
    QGLOT: 9,
    NBGLOT: 31,
    DIFT: 3,
    QDIFT: 9,
    NBDIFT: 31,
    DIRT: 3,
    QDIRT: 9,
    NBDIRT: 31,
    HNEIGEFTOT: 3,
    QHNEIGEFTOT: 9,
    HNEIGEFAB: 3,
    QHNEIGEFAB: 9,
    HNEIGEFDAT: 15,
    NBHNEIGEF: 31,
    NBJNEIG: 31,
    NBJHNEIGEF1: 31,
    NBJHNEIGEF5: 31,
    NBJHNEIGEF10: 31,
    NBJSOLNG: 31,
    NEIGETOTM: 3,
    QNEIGETOTM: 9,
    NEIGETOTAB: 3,
    QNEIGETOTAB: 9,
    NEIGETOTABDAT: 15,
    NBJNEIGETOT1: 31,
    NBJNEIGETOT10: 31,
    NBJNEIGETOT30: 31,
    NBJGREL: 31,
    NBJORAG: 31,
    NBJBROU: 31,
};

export const dto2: MensuelleDTO = {
    NUM_POSTE: '01014002',
    NOM_USUEL: 'ARBENT',
    LAT: 46.278167,
    LON: 5.669,
    ALTI: 534,
    AAAAMM: new Date('2023-04-01T00:00:00Z'),
    RR: null,
    QRR: null,
    NBRR: null,
    RR_ME: null,
    RRAB: null,
    QRRAB: null,
    RRABDAT: null,
    NBJRR1: null,
    NBJRR5: null,
    NBJRR10: null,
    NBJRR30: null,
    NBJRR50: null,
    NBJRR100: null,
    PMERM: null,
    QPMERM: null,
    NBPMERM: null,
    PMERMINAB: null,
    QPMERMINAB: null,
    PMERMINABDAT: null,
    TX: null,
    QTX: null,
    NBTX: null,
    TX_ME: null,
    TXAB: null,
    QTXAB: null,
    TXDAT: null,
    TXMIN: null,
    QTXMIN: null,
    TXMINDAT: null,
    NBJTX0: null,
    NBJTX25: null,
    NBJTX30: null,
    NBJTX35: null,
    NBJTXI20: null,
    NBJTXI27: null,
    NBJTXS32: null,
    TN: null,
    QTN: null,
    NBTN: null,
    TN_ME: null,
    TNAB: null,
    QTNAB: null,
    TNDAT: null,
    TNMAX: null,
    QTNMAX: null,
    TNMAXDAT: null,
    NBJTN5: null,
    NBJTN10: null,
    NBJTNI10: null,
    NBJTNI15: null,
    NBJTNI20: null,
    NBJTNS20: null,
    NBJTNS25: null,
    NBJGELEE: null,
    TAMPLIM: null,
    QTAMPLIM: null,
    TAMPLIAB: null,
    QTAMPLIAB: null,
    TAMPLIABDAT: null,
    NBTAMPLI: null,
    TM: null,
    QTM: null,
    NBTM: null,
    TMM: null,
    QTMM: null,
    NBTMM: null,
    NBJTMS24: null,
    TMMIN: null,
    QTMMIN: null,
    TMMINDAT: null,
    TMMAX: null,
    QTMMAX: null,
    TMMAXDAT: null,
    UNAB: null,
    QUNAB: null,
    UNABDAT: null,
    NBUN: null,
    UXAB: null,
    QUXAB: null,
    UXABDAT: null,
    NBUX: null,
    UMM: null,
    QUMM: null,
    NBUM: null,
    TSVM: null,
    QTSVM: null,
    NBTSVM: null,
    ETP: null,
    QETP: null,
    FXIAB: null,
    QFXIAB: null,
    DXIAB: null,
    QDXIAB: null,
    FXIDAT: null,
    NBJFF10: null,
    NBJFF16: null,
    NBJFF28: null,
    NBFXI: null,
    FXI3SAB: null,
    QFXI3SAB: null,
    DXI3SAB: null,
    QDXI3SAB: null,
    FXI3SDAT: null,
    NBJFXI3S10: null,
    NBJFXI3S16: null,
    NBJFXI3S28: null,
    NBFXI3S: null,
    FXYAB: null,
    QFXYAB: null,
    DXYAB: null,
    QDXYAB: null,
    FXYABDAT: null,
    NBJFXY8: null,
    NBJFXY10: null,
    NBJFXY15: null,
    NBFXY: null,
    FFM: null,
    QFFM: null,
    NBFFM: null,
    INST: null,
    QINST: null,
    NBINST: null,
    NBSIGMA0: null,
    NBSIGMA20: null,
    NBSIGMA80: null,
    GLOT: null,
    QGLOT: null,
    NBGLOT: null,
    DIFT: null,
    QDIFT: null,
    NBDIFT: null,
    DIRT: null,
    QDIRT: null,
    NBDIRT: null,
    HNEIGEFTOT: null,
    QHNEIGEFTOT: null,
    HNEIGEFAB: null,
    QHNEIGEFAB: null,
    HNEIGEFDAT: null,
    NBHNEIGEF: null,
    NBJNEIG: null,
    NBJHNEIGEF1: null,
    NBJHNEIGEF5: null,
    NBJHNEIGEF10: null,
    NBJSOLNG: null,
    NEIGETOTM: null,
    QNEIGETOTM: null,
    NEIGETOTAB: null,
    QNEIGETOTAB: null,
    NEIGETOTABDAT: null,
    NBJNEIGETOT1: null,
    NBJNEIGETOT10: null,
    NBJNEIGETOT30: null,
    NBJGREL: null,
    NBJORAG: null,
    NBJBROU: null,
};

describe('InMemoryMensuellesRepository', () => {
    describe('upsert', () => {
        it('should upsert', async () => {
            const repository = new InMemoryMensuellesRepository({ dtos: [] });

            await repository.upsert(dto1);
            await repository.upsert(dto2);
            const dtos1 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos1).toEqual([dto1, dto2]);

            const modifiedDto1: MensuelleDTO = {
                ...dto1,
                NBJBROU: 1,
            };

            await repository.upsert(modifiedDto1);
            const dtos2 = await getArrayFromAsyncGenerator(repository.getAll());
            expect(dtos2).toEqual([modifiedDto1, dto2]);
        });
    });
});
