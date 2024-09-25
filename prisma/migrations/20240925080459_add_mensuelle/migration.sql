-- CreateTable
CREATE TABLE "Mensuelle"
(
    "NUM_POSTE"     CHAR(8)          NOT NULL,
    "NOM_USUEL"     VARCHAR(255)     NOT NULL,
    "LAT"           DOUBLE PRECISION NOT NULL,
    "LON"           DOUBLE PRECISION NOT NULL,
    "ALTI"          DOUBLE PRECISION NOT NULL,
    "AAAAMM"        TIMESTAMP(3)     NOT NULL,
    "RR"            DOUBLE PRECISION,
    "QRR"           INTEGER,
    "NBRR"          INTEGER,
    "RR_ME"         DOUBLE PRECISION,
    "RRAB"          DOUBLE PRECISION,
    "QRRAB"         INTEGER,
    "RRABDAT"       INTEGER,
    "NBJRR1"        INTEGER,
    "NBJRR5"        INTEGER,
    "NBJRR10"       INTEGER,
    "NBJRR30"       INTEGER,
    "NBJRR50"       INTEGER,
    "NBJRR100"      INTEGER,
    "PMERM"         DOUBLE PRECISION,
    "QPMERM"        INTEGER,
    "NBPMERM"       INTEGER,
    "PMERMINAB"     DOUBLE PRECISION,
    "QPMERMINAB"    INTEGER,
    "PMERMINABDAT"  INTEGER,
    "TX"            DOUBLE PRECISION,
    "QTX"           INTEGER,
    "NBTX"          INTEGER,
    "TX_ME"         DOUBLE PRECISION,
    "TXAB"          DOUBLE PRECISION,
    "QTXAB"         INTEGER,
    "TXDAT"         INTEGER,
    "TXMIN"         DOUBLE PRECISION,
    "QTXMIN"        INTEGER,
    "TXMINDAT"      INTEGER,
    "NBJTX0"        INTEGER,
    "NBJTX25"       INTEGER,
    "NBJTX30"       INTEGER,
    "NBJTX35"       INTEGER,
    "NBJTXI20"      INTEGER,
    "NBJTXI27"      INTEGER,
    "NBJTXS32"      INTEGER,
    "TN"            DOUBLE PRECISION,
    "QTN"           INTEGER,
    "NBTN"          INTEGER,
    "TN_ME"         DOUBLE PRECISION,
    "TNAB"          DOUBLE PRECISION,
    "QTNAB"         INTEGER,
    "TNDAT"         INTEGER,
    "TNMAX"         DOUBLE PRECISION,
    "QTNMAX"        INTEGER,
    "TNMAXDAT"      INTEGER,
    "NBJTN5"        INTEGER,
    "NBJTN10"       INTEGER,
    "NBJTNI10"      INTEGER,
    "NBJTNI15"      INTEGER,
    "NBJTNI20"      INTEGER,
    "NBJTNS20"      INTEGER,
    "NBJTNS25"      INTEGER,
    "NBJGELEE"      INTEGER,
    "TAMPLIM"       DOUBLE PRECISION,
    "QTAMPLIM"      INTEGER,
    "TAMPLIAB"      DOUBLE PRECISION,
    "QTAMPLIAB"     INTEGER,
    "TAMPLIABDAT"   INTEGER,
    "NBTAMPLI"      INTEGER,
    "TM"            DOUBLE PRECISION,
    "QTM"           INTEGER,
    "NBTM"          INTEGER,
    "TMM"           DOUBLE PRECISION,
    "QTMM"          INTEGER,
    "NBTMM"         INTEGER,
    "NBJTMS24"      INTEGER,
    "TMMIN"         DOUBLE PRECISION,
    "QTMMIN"        INTEGER,
    "TMMINDAT"      INTEGER,
    "TMMAX"         DOUBLE PRECISION,
    "QTMMAX"        INTEGER,
    "TMMAXDAT"      INTEGER,
    "UNAB"          INTEGER,
    "QUNAB"         INTEGER,
    "UNABDAT"       INTEGER,
    "NBUN"          INTEGER,
    "UXAB"          INTEGER,
    "QUXAB"         INTEGER,
    "UXABDAT"       INTEGER,
    "NBUX"          INTEGER,
    "UMM"           INTEGER,
    "QUMM"          INTEGER,
    "NBUM"          INTEGER,
    "TSVM"          DOUBLE PRECISION,
    "QTSVM"         INTEGER,
    "NBTSVM"        INTEGER,
    "ETP"           DOUBLE PRECISION,
    "QETP"          INTEGER,
    "FXIAB"         DOUBLE PRECISION,
    "QFXIAB"        INTEGER,
    "DXIAB"         INTEGER,
    "QDXIAB"        INTEGER,
    "FXIDAT"        INTEGER,
    "NBJFF10"       INTEGER,
    "NBJFF16"       INTEGER,
    "NBJFF28"       INTEGER,
    "NBFXI"         INTEGER,
    "FXI3SAB"       DOUBLE PRECISION,
    "QFXI3SAB"      INTEGER,
    "DXI3SAB"       INTEGER,
    "QDXI3SAB"      INTEGER,
    "FXI3SDAT"      INTEGER,
    "NBJFXI3S10"    INTEGER,
    "NBJFXI3S16"    INTEGER,
    "NBJFXI3S28"    INTEGER,
    "NBFXI3S"       INTEGER,
    "FXYAB"         DOUBLE PRECISION,
    "QFXYAB"        INTEGER,
    "DXYAB"         INTEGER,
    "QDXYAB"        INTEGER,
    "FXYABDAT"      INTEGER,
    "NBJFXY8"       INTEGER,
    "NBJFXY10"      INTEGER,
    "NBJFXY15"      INTEGER,
    "NBFXY"         INTEGER,
    "FFM"           DOUBLE PRECISION,
    "QFFM"          INTEGER,
    "NBFFM"         INTEGER,
    "INST"          INTEGER,
    "QINST"         INTEGER,
    "NBINST"        INTEGER,
    "NBSIGMA0"      INTEGER,
    "NBSIGMA20"     INTEGER,
    "NBSIGMA80"     INTEGER,
    "GLOT"          INTEGER,
    "QGLOT"         INTEGER,
    "NBGLOT"        INTEGER,
    "DIFT"          INTEGER,
    "QDIFT"         INTEGER,
    "NBDIFT"        INTEGER,
    "DIRT"          INTEGER,
    "QDIRT"         INTEGER,
    "NBDIRT"        INTEGER,
    "HNEIGEFTOT"    INTEGER,
    "QHNEIGEFTOT"   INTEGER,
    "HNEIGEFAB"     INTEGER,
    "QHNEIGEFAB"    INTEGER,
    "HNEIGEFDAT"    INTEGER,
    "NBHNEIGEF"     INTEGER,
    "NBJNEIG"       INTEGER,
    "NBJHNEIGEF1"   INTEGER,
    "NBJHNEIGEF5"   INTEGER,
    "NBJHNEIGEF10"  INTEGER,
    "NBJSOLNG"      INTEGER,
    "NEIGETOTM"     INTEGER,
    "QNEIGETOTM"    INTEGER,
    "NEIGETOTAB"    INTEGER,
    "QNEIGETOTAB"   INTEGER,
    "NEIGETOTABDAT" INTEGER,
    "NBJNEIGETOT1"  INTEGER,
    "NBJNEIGETOT10" INTEGER,
    "NBJNEIGETOT30" INTEGER,
    "NBJGREL"       INTEGER,
    "NBJORAG"       INTEGER,
    "NBJBROU"       INTEGER,

    CONSTRAINT "Mensuelle_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMM")
);
