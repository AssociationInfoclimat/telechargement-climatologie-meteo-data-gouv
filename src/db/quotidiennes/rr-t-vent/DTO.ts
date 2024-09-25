export interface QuotidienneDTO {
    NUM_POSTE: string;
    NOM_USUEL: string;
    LAT: number;
    LON: number;
    ALTI: number;
    AAAAMMJJ: Date;

    RR: number | null;
    QRR: number | null;

    TN: number | null;
    QTN: number | null;

    HTN: string | null;
    QHTN: number | null;

    TX: number | null;
    QTX: number | null;

    HTX: string | null;
    QHTX: number | null;

    TM: number | null;
    QTM: number | null;

    TNTXM: number | null;
    QTNTXM: number | null;

    TAMPLI: number | null;
    QTAMPLI: number | null;

    TNSOL: number | null;
    QTNSOL: number | null;

    TN50: number | null;
    QTN50: number | null;

    DG: number | null;
    QDG: number | null;

    FFM: number | null;
    QFFM: number | null;

    FF2M: number | null;
    QFF2M: number | null;

    FXY: number | null;
    QFXY: number | null;

    DXY: number | null;
    QDXY: number | null;

    HXY: string | null;
    QHXY: number | null;

    FXI: number | null;
    QFXI: number | null;

    DXI: number | null;
    QDXI: number | null;

    HXI: string | null;
    QHXI: number | null;

    FXI2: number | null;
    QFXI2: number | null;

    DXI2: number | null;
    QDXI2: number | null;

    HXI2: string | null;
    QHXI2: number | null;

    FXI3S: number | null;
    QFXI3S: number | null;

    DXI3S: number | null;
    QDXI3S: number | null;

    HXI3S: string | null;
    QHXI3S: number | null;

    DRR: number | null;
    QDRR: number | null;
}
