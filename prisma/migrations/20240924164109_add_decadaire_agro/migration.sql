-- CreateTable
CREATE TABLE "DecadaireAgro"
(
    "NUM_POSTE"  CHAR(8)          NOT NULL,
    "NOM_USUEL"  VARCHAR(255)     NOT NULL,
    "LAT"        DOUBLE PRECISION NOT NULL,
    "LON"        DOUBLE PRECISION NOT NULL,
    "ALTI"       DOUBLE PRECISION NOT NULL,
    "AAAAMM"     TIMESTAMP(3)     NOT NULL,
    "NUM_DECADE" INTEGER          NOT NULL,
    "RR"         DOUBLE PRECISION,
    "CRR"        INTEGER,
    "TN"         DOUBLE PRECISION,
    "CTN"        INTEGER,
    "TX"         DOUBLE PRECISION,
    "CTX"        INTEGER,
    "FFM"        DOUBLE PRECISION,
    "CFFM"       INTEGER,
    "TSVM"       DOUBLE PRECISION,
    "CTSVM"      INTEGER,
    "INST"       INTEGER,
    "CINST"      INTEGER,
    "GLOT"       INTEGER,
    "CGLOT"      INTEGER,
    "ETP"        DOUBLE PRECISION,

    CONSTRAINT "DecadaireAgro_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMM", "NUM_DECADE")
);
