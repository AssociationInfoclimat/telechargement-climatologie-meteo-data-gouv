-- CreateTable
CREATE TABLE "Infrahoraire"
(
    "NUM_POSTE"    CHAR(8)          NOT NULL,
    "NOM_USUEL"    VARCHAR(255)     NOT NULL,
    "LAT"          DOUBLE PRECISION NOT NULL,
    "LON"          DOUBLE PRECISION NOT NULL,
    "ALTI"         DOUBLE PRECISION NOT NULL,
    "AAAAMMJJHHMN" TIMESTAMP(3)     NOT NULL,
    "RR"           DOUBLE PRECISION,
    "QRR"          INTEGER,

    CONSTRAINT "Infrahoraire_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMMJJHHMN")
);
