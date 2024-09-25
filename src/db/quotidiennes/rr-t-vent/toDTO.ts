import { QuotidienneLine } from '@/csv/quotidiennes/rr-t-vent/parseCSV.js';
import { QuotidienneDTO } from '@/db/quotidiennes/rr-t-vent/DTO.js';

export function toDTO(line: QuotidienneLine): QuotidienneDTO {
    return {
        NUM_POSTE: line.NUM_POSTE.value(),
        NOM_USUEL: line.NOM_USUEL,
        LAT: line.LAT,
        LON: line.LON,
        ALTI: line.ALTI,
        AAAAMMJJ: line.AAAAMMJJ,

        RR: line.RR.value(),
        QRR: line.QRR.value(),

        TN: line.TN,
        QTN: line.QTN.value(),

        HTN: line.HTN.value(),
        QHTN: line.QHTN.value(),

        TX: line.TX,
        QTX: line.QTX.value(),

        HTX: line.HTX.value(),
        QHTX: line.QHTX.value(),

        TM: line.TM,
        QTM: line.QTM.value(),

        TNTXM: line.TNTXM,
        QTNTXM: line.QTNTXM.value(),

        TAMPLI: line.TAMPLI.value(),
        QTAMPLI: line.QTAMPLI.value(),

        TNSOL: line.TNSOL,
        QTNSOL: line.QTNSOL.value(),

        TN50: line.TN50,
        QTN50: line.QTN50.value(),

        DG: line.DG.value(),
        QDG: line.QDG.value(),

        FFM: line.FFM.value(),
        QFFM: line.QFFM.value(),

        FF2M: line.FF2M.value(),
        QFF2M: line.QFF2M.value(),

        FXY: line.FXY.value(),
        QFXY: line.QFXY.value(),

        DXY: line.DXY.value(),
        QDXY: line.QDXY.value(),

        HXY: line.HXY.value(),
        QHXY: line.QHXY.value(),

        FXI: line.FXI.value(),
        QFXI: line.QFXI.value(),

        DXI: line.DXI.value(),
        QDXI: line.QDXI.value(),

        HXI: line.HXI.value(),
        QHXI: line.QHXI.value(),

        FXI2: line.FXI2.value(),
        QFXI2: line.QFXI2.value(),

        DXI2: line.DXI2.value(),
        QDXI2: line.QDXI2.value(),

        HXI2: line.HXI2.value(),
        QHXI2: line.QHXI2.value(),

        FXI3S: line.FXI3S.value(),
        QFXI3S: line.QFXI3S.value(),

        DXI3S: line.DXI3S.value(),
        QDXI3S: line.QDXI3S.value(),

        HXI3S: line.HXI3S.value(),
        QHXI3S: line.QHXI3S.value(),

        DRR: line.DRR.value(),
        QDRR: line.QDRR.value(),
    };
}
