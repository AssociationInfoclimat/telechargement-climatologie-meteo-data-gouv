import { DecadaireLine } from '@/csv/decadaires/parseCSV.js';
import { DecadaireDTO } from '@/db/decadaires/DTO.js';

export function toDTO(line: DecadaireLine): DecadaireDTO {
    return {
        NUM_POSTE: line.NUM_POSTE.value(),
        NOM_USUEL: line.NOM_USUEL,
        LAT: line.LAT,
        LON: line.LON,
        ALTI: line.ALTI,
        AAAAMM: line.AAAAMM,
        NUM_DECADE: line.NUM_DECADE.value(),
        RR: line.RR.value(),
        QRR: line.QRR.value(),
        NBRR: line.NBRR.value(),
        RRAB: line.RRAB.value(),
        QRRAB: line.QRRAB.value(),
        RRABDAT: line.RRABDAT.value(),
        NBJRR1: line.NBJRR1.value(),
        NBJRR5: line.NBJRR5.value(),
        NBJRR10: line.NBJRR10.value(),
        NBJRR30: line.NBJRR30.value(),
        NBJRR50: line.NBJRR50.value(),
        NBJRR100: line.NBJRR100.value(),
        PMERM: line.PMERM.value(),
        QPMERM: line.QPMERM.value(),
        NBPMERM: line.NBPMERM.value(),
        PMERMINAB: line.PMERMINAB.value(),
        QPMERMINAB: line.QPMERMINAB.value(),
        PMERMINABDAT: line.PMERMINABDAT.value(),
        TX: line.TX.value(),
        QTX: line.QTX.value(),
        NBTX: line.NBTX.value(),
        TXAB: line.TXAB,
        QTXAB: line.QTXAB.value(),
        TXDAT: line.TXDAT.value(),
        TXMIN: line.TXMIN,
        QTXMIN: line.QTXMIN.value(),
        TXMINDAT: line.TXMINDAT.value(),
        NBJTX0: line.NBJTX0.value(),
        NBJTX25: line.NBJTX25.value(),
        NBJTX30: line.NBJTX30.value(),
        NBJTX35: line.NBJTX35.value(),
        NBJTXI20: line.NBJTXI20.value(),
        NBJTXI27: line.NBJTXI27.value(),
        NBJTXS32: line.NBJTXS32.value(),
        TN: line.TN,
        QTN: line.QTN.value(),
        NBTN: line.NBTN.value(),
        TNAB: line.TNAB,
        QTNAB: line.QTNAB.value(),
        TNDAT: line.TNDAT.value(),
        TNMAX: line.TNMAX,
        QTNMAX: line.QTNMAX.value(),
        TNMAXDAT: line.TNMAXDAT.value(),
        NBJTN5: line.NBJTN5.value(),
        NBJTN10: line.NBJTN10.value(),
        NBJTNI10: line.NBJTNI10.value(),
        NBJTNI15: line.NBJTNI15.value(),
        NBJTNI20: line.NBJTNI20.value(),
        NBJTNS20: line.NBJTNS20.value(),
        NBJTNS25: line.NBJTNS25.value(),
        NBJGELEE: line.NBJGELEE.value(),
        TAMPLIM: line.TAMPLIM.value(),
        QTAMPLIM: line.QTAMPLIM.value(),
        TAMPLIAB: line.TAMPLIAB.value(),
        QTAMPLIAB: line.QTAMPLIAB.value(),
        TAMPLIABDAT: line.TAMPLIABDAT.value(),
        NBTAMPLI: line.NBTAMPLI.value(),
        TM: line.TM,
        QTM: line.QTM.value(),
        NBTM: line.NBTM.value(),
        TMM: line.TMM,
        QTMM: line.QTMM.value(),
        NBTMM: line.NBTMM.value(),
        NBJTMS24: line.NBJTMS24.value(),
        TMMIN: line.TMMIN,
        QTMMIN: line.QTMMIN.value(),
        TMMINDAT: line.TMMINDAT.value(),
        TMMAX: line.TMMAX,
        QTMMAX: line.QTMMAX.value(),
        TMMAXDAT: line.TMMAXDAT.value(),
        UNAB: line.UNAB.value(),
        QUNAB: line.QUNAB.value(),
        UNABDAT: line.UNABDAT.value(),
        NBUN: line.NBUN.value(),
        UXAB: line.UXAB.value(),
        QUXAB: line.QUXAB.value(),
        UXABDAT: line.UXABDAT.value(),
        NBUX: line.NBUX.value(),
        UMM: line.UMM.value(),
        QUMM: line.QUMM.value(),
        NBUM: line.NBUM.value(),
        TSVM: line.TSVM.value(),
        QTSVM: line.QTSVM.value(),
        NBTSVM: line.NBTSVM.value(),
        FXIAB: line.FXIAB.value(),
        QFXIAB: line.QFXIAB.value(),
        DXIAB: line.DXIAB.value(),
        QDXIAB: line.QDXIAB.value(),
        FXIDAT: line.FXIDAT.value(),
        NBJFF10: line.NBJFF10.value(),
        NBJFF16: line.NBJFF16.value(),
        NBJFF28: line.NBJFF28.value(),
        NBFXI: line.NBFXI.value(),
        FXI3SAB: line.FXI3SAB.value(),
        QFXI3SAB: line.QFXI3SAB.value(),
        DXI3SAB: line.DXI3SAB.value(),
        QDXI3SAB: line.QDXI3SAB.value(),
        FXI3SDAT: line.FXI3SDAT.value(),
        NBJFXI3S10: line.NBJFXI3S10.value(),
        NBJFXI3S16: line.NBJFXI3S16.value(),
        NBJFXI3S28: line.NBJFXI3S28.value(),
        NBFXI3S: line.NBFXI3S.value(),
        FXYAB: line.FXYAB.value(),
        QFXYAB: line.QFXYAB.value(),
        DXYAB: line.DXYAB.value(),
        QDXYAB: line.QDXYAB.value(),
        FXYABDAT: line.FXYABDAT.value(),
        NBJFXY8: line.NBJFXY8.value(),
        NBJFXY10: line.NBJFXY10.value(),
        NBJFXY15: line.NBJFXY15.value(),
        NBFXY: line.NBFXY.value(),
        FFM: line.FFM.value(),
        QFFM: line.QFFM.value(),
        NBFFM: line.NBFFM.value(),
        INST: line.INST.value(),
        QINST: line.QINST.value(),
        NBINST: line.NBINST.value(),
        NBSIGMA0: line.NBSIGMA0.value(),
        NBSIGMA20: line.NBSIGMA20.value(),
        NBSIGMA80: line.NBSIGMA80.value(),
        GLOT: line.GLOT.value(),
        QGLOT: line.QGLOT.value(),
        NBGLOT: line.NBGLOT.value(),
        DIFT: line.DIFT.value(),
        QDIFT: line.QDIFT.value(),
        NBDIFT: line.NBDIFT.value(),
        DIRT: line.DIRT.value(),
        QDIRT: line.QDIRT.value(),
        NBDIRT: line.NBDIRT.value(),
        HNEIGEFTOT: line.HNEIGEFTOT.value(),
        QHNEIGEFTOT: line.QHNEIGEFTOT.value(),
        HNEIGEFAB: line.HNEIGEFAB.value(),
        QHNEIGEFAB: line.QHNEIGEFAB.value(),
        HNEIGEFDAT: line.HNEIGEFDAT.value(),
        NBHNEIGEF: line.NBHNEIGEF.value(),
        NBJNEIG: line.NBJNEIG.value(),
        NBJHNEIGEF1: line.NBJHNEIGEF1.value(),
        NBJHNEIGEF5: line.NBJHNEIGEF5.value(),
        NBJHNEIGEF10: line.NBJHNEIGEF10.value(),
        NBJSOLNG: line.NBJSOLNG.value(),
        NEIGETOTM: line.NEIGETOTM.value(),
        QNEIGETOTM: line.QNEIGETOTM.value(),
        NEIGETOTAB: line.NEIGETOTAB.value(),
        QNEIGETOTAB: line.QNEIGETOTAB.value(),
        NEIGETOTABDAT: line.NEIGETOTABDAT.value(),
        NBJNEIGETOT1: line.NBJNEIGETOT1.value(),
        NBJNEIGETOT10: line.NBJNEIGETOT10.value(),
        NBJNEIGETOT30: line.NBJNEIGETOT30.value(),
        NBJGREL: line.NBJGREL.value(),
        NBJORAG: line.NBJORAG.value(),
        NBJBROU: line.NBJBROU.value(),
    };
}
