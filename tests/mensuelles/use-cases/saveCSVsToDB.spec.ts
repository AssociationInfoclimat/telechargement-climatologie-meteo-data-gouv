import { InMemoryMensuellesRepository } from '@/db/mensuelles/InMemoryRepository.js';
import { createInMemoryGlobber } from '@/lib/fs/glob/glob.in-memory.js';
import { createInMemoryLineReader } from '@/lib/fs/read-lines/readLines.in-memory.js';
import { getArrayFromAsyncGenerator } from '@/lib/generator/generatorUtils.js';
import { saveCSVsToDB } from '@/mensuelles/use-cases/saveCSVsToDB.js';
import { InMemorySaveProgressRepository } from '@/save-progress/db/InMemorySaveProgressRepository.js';
import { assert, describe, it } from 'vitest';

describe('saveCSVsToDB', () => {
    it('should work', async () => {
        const mensuellesRepository = new InMemoryMensuellesRepository();
        const saveProgressRepository = new InMemorySaveProgressRepository(['MENSQ_01_1940-1949']);
        await saveCSVsToDB({
            directory: '/my/directory',
            globber: createInMemoryGlobber([
                '/my/directory/MENSQ_01_1940-1949.csv',
                '/my/directory/MENSQ_01_previous-1950-2022.csv',
                '/my/directory/MENSQ_01_latest-2023-2024.csv',
            ]),
            lineReader: createInMemoryLineReader({
                '/my/directory/MENSQ_01_1940-1949.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;RR;QRR;NBRR;RR_ME;RRAB;QRRAB;RRABDAT;NBJRR1;NBJRR5;NBJRR10;NBJRR30;NBJRR50;NBJRR100;PMERM;QPMERM;NBPMERM;PMERMINAB;QPMERMINAB;PMERMINABDAT;TX;QTX;NBTX;TX_ME;TXAB;QTXAB;TXDAT;TXMIN;QTXMIN;TXMINDAT;NBJTX0;NBJTX25;NBJTX30;NBJTX35;NBJTXI20;NBJTXI27;NBJTXS32;TN;QTN;NBTN;TN_ME;TNAB;QTNAB;TNDAT;TNMAX;QTNMAX;TNMAXDAT;NBJTN5;NBJTN10;NBJTNI10;NBJTNI15;NBJTNI20;NBJTNS20;NBJTNS25;NBJGELEE;TAMPLIM;QTAMPLIM;TAMPLIAB;QTAMPLIAB;TAMPLIABDAT;NBTAMPLI;TM;QTM;NBTM;TMM;QTMM;NBTMM;NBJTMS24;TMMIN;QTMMIN;TMMINDAT;TMMAX;QTMMAX;TMMAXDAT;UNAB;QUNAB;UNABDAT;NBUN;UXAB;QUXAB;UXABDAT;NBUX;UMM;QUMM;NBUM;TSVM;QTSVM;NBTSVM;ETP;QETP;FXIAB;QFXIAB;DXIAB;QDXIAB;FXIDAT;NBJFF10;NBJFF16;NBJFF28;NBFXI;FXI3SAB;QFXI3SAB;DXI3SAB;QDXI3SAB;FXI3SDAT;NBJFXI3S10;NBJFXI3S16;NBJFXI3S28;NBFXI3S;FXYAB;QFXYAB;DXYAB;QDXYAB;FXYABDAT;NBJFXY8;NBJFXY10;NBJFXY15;NBFXY;FFM;QFFM;NBFFM;INST;QINST;NBINST;NBSIGMA0;NBSIGMA20;NBSIGMA80;GLOT;QGLOT;NBGLOT;DIFT;QDIFT;NBDIFT;DIRT;QDIRT;NBDIRT;HNEIGEFTOT;QHNEIGEFTOT;HNEIGEFAB;QHNEIGEFAB;HNEIGEFDAT;NBHNEIGEF;NBJNEIG;NBJHNEIGEF1;NBJHNEIGEF5;NBJHNEIGEF10;NBJSOLNG;NEIGETOTM;QNEIGETOTM;NEIGETOTAB;QNEIGETOTAB;NEIGETOTABDAT;NBJNEIGETOT1;NBJNEIGETOT10;NBJNEIGETOT30;NBJGREL;NBJORAG;NBJBROU',
                    '01014002;ARBENT;46.278167;5.669000;534;194003;1.1;9;31;1.1;1.1;9;15;31;31;31;31;31;31;1.1;9;31;1.1;9;15;1.1;9;31;-2.2;-2.2;9;15;-2.2;9;15;31;31;31;31;31;31;31;-2.2;9;31;-2.2;-2.2;9;15;-2.2;9;15;31;31;31;31;31;31;31;31;1.1;9;1.1;9;15;31;-2.2;9;31;-2.2;9;31;31;-2.2;9;15;-2.2;9;15;100;9;15;31;100;9;15;31;100;9;31;1.1;9;31;1.1;9;1.1;9;360;9;15;31;31;31;31;1.1;9;360;9;15;31;31;31;31;1.1;9;360;9;15;31;31;31;31;1.1;9;31;3;9;31;31;31;31;3;9;31;3;9;31;3;9;31;3;9;3;9;15;31;31;31;31;31;31;3;9;3;9;15;31;31;31;31;31;31',
                    '01014002;ARBENT;46.278167;5.669000;534;194004;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
                    '',
                ],
                '/my/directory/MENSQ_01_previous-1950-2022.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;RR;QRR;NBRR;RR_ME;RRAB;QRRAB;RRABDAT;NBJRR1;NBJRR5;NBJRR10;NBJRR30;NBJRR50;NBJRR100;PMERM;QPMERM;NBPMERM;PMERMINAB;QPMERMINAB;PMERMINABDAT;TX;QTX;NBTX;TX_ME;TXAB;QTXAB;TXDAT;TXMIN;QTXMIN;TXMINDAT;NBJTX0;NBJTX25;NBJTX30;NBJTX35;NBJTXI20;NBJTXI27;NBJTXS32;TN;QTN;NBTN;TN_ME;TNAB;QTNAB;TNDAT;TNMAX;QTNMAX;TNMAXDAT;NBJTN5;NBJTN10;NBJTNI10;NBJTNI15;NBJTNI20;NBJTNS20;NBJTNS25;NBJGELEE;TAMPLIM;QTAMPLIM;TAMPLIAB;QTAMPLIAB;TAMPLIABDAT;NBTAMPLI;TM;QTM;NBTM;TMM;QTMM;NBTMM;NBJTMS24;TMMIN;QTMMIN;TMMINDAT;TMMAX;QTMMAX;TMMAXDAT;UNAB;QUNAB;UNABDAT;NBUN;UXAB;QUXAB;UXABDAT;NBUX;UMM;QUMM;NBUM;TSVM;QTSVM;NBTSVM;ETP;QETP;FXIAB;QFXIAB;DXIAB;QDXIAB;FXIDAT;NBJFF10;NBJFF16;NBJFF28;NBFXI;FXI3SAB;QFXI3SAB;DXI3SAB;QDXI3SAB;FXI3SDAT;NBJFXI3S10;NBJFXI3S16;NBJFXI3S28;NBFXI3S;FXYAB;QFXYAB;DXYAB;QDXYAB;FXYABDAT;NBJFXY8;NBJFXY10;NBJFXY15;NBFXY;FFM;QFFM;NBFFM;INST;QINST;NBINST;NBSIGMA0;NBSIGMA20;NBSIGMA80;GLOT;QGLOT;NBGLOT;DIFT;QDIFT;NBDIFT;DIRT;QDIRT;NBDIRT;HNEIGEFTOT;QHNEIGEFTOT;HNEIGEFAB;QHNEIGEFAB;HNEIGEFDAT;NBHNEIGEF;NBJNEIG;NBJHNEIGEF1;NBJHNEIGEF5;NBJHNEIGEF10;NBJSOLNG;NEIGETOTM;QNEIGETOTM;NEIGETOTAB;QNEIGETOTAB;NEIGETOTABDAT;NBJNEIGETOT1;NBJNEIGETOT10;NBJNEIGETOT30;NBJGREL;NBJORAG;NBJBROU',
                    '01014002;ARBENT;46.278167;5.669000;534;202301;112.8;1;31;;17.8;1;8;14;10;4;0;0;0;;;0;;;;6.4;1;31;;17.7;1;1;-1.1;1;22;1;0;0;0;31;31;0;-1.2;1;31;;-15.7;1;20;11.6;1;1;10;4;30;31;31;0;0;15;7.6;1;20.2;1;20;31;2.6;1;31;2.6;1;31;0;-5.6;1;20;14.7;1;1;35;1;14;31;100;1;31;31;85;1;31;6.5;9;31;;;18.2;1;150;1;16;12;5;0;31;16.7;9;;0;16;11;2;0;31;10.2;1;150;1;16;2;1;0;31;1.9;1;31;;;0;;;;;;0;;;0;;;0;;;;;;0;;;;;;3;9;12;9;19;15;2;0;;;',
                    '01014002;ARBENT;46.278167;5.669000;534;202302;19.4;1;28;;9.8;1;23;5;1;0;0;0;0;;;0;;;;10.7;1;28;;17.3;1;21;3.2;1;26;0;0;0;0;28;28;0;-3.7;1;28;;-10.3;1;10;5.9;1;18;13;1;28;28;28;0;0;21;14.4;1;23.4;1;13;28;3.5;1;28;2.4;1;28;0;-1.8;1;10;10.2;1;18;26;1;13;28;100;1;25;28;82;1;28;6.0;9;28;;;25.5;1;40;1;26;3;1;0;28;23.0;9;;0;26;3;1;0;28;12.6;1;10;1;26;1;1;0;28;1.4;1;28;;;0;;;;;;0;;;0;;;0;;;;;;0;;;;;;0;9;0;9;;0;0;0;;;',
                    '',
                ],
                '/my/directory/MENSQ_01_latest-2023-2024.csv': [
                    'NUM_POSTE;NOM_USUEL;LAT;LON;ALTI;AAAAMM;RR;QRR;NBRR;RR_ME;RRAB;QRRAB;RRABDAT;NBJRR1;NBJRR5;NBJRR10;NBJRR30;NBJRR50;NBJRR100;PMERM;QPMERM;NBPMERM;PMERMINAB;QPMERMINAB;PMERMINABDAT;TX;QTX;NBTX;TX_ME;TXAB;QTXAB;TXDAT;TXMIN;QTXMIN;TXMINDAT;NBJTX0;NBJTX25;NBJTX30;NBJTX35;NBJTXI20;NBJTXI27;NBJTXS32;TN;QTN;NBTN;TN_ME;TNAB;QTNAB;TNDAT;TNMAX;QTNMAX;TNMAXDAT;NBJTN5;NBJTN10;NBJTNI10;NBJTNI15;NBJTNI20;NBJTNS20;NBJTNS25;NBJGELEE;TAMPLIM;QTAMPLIM;TAMPLIAB;QTAMPLIAB;TAMPLIABDAT;NBTAMPLI;TM;QTM;NBTM;TMM;QTMM;NBTMM;NBJTMS24;TMMIN;QTMMIN;TMMINDAT;TMMAX;QTMMAX;TMMAXDAT;UNAB;QUNAB;UNABDAT;NBUN;UXAB;QUXAB;UXABDAT;NBUX;UMM;QUMM;NBUM;TSVM;QTSVM;NBTSVM;ETP;QETP;FXIAB;QFXIAB;DXIAB;QDXIAB;FXIDAT;NBJFF10;NBJFF16;NBJFF28;NBFXI;FXI3SAB;QFXI3SAB;DXI3SAB;QDXI3SAB;FXI3SDAT;NBJFXI3S10;NBJFXI3S16;NBJFXI3S28;NBFXI3S;FXYAB;QFXYAB;DXYAB;QDXYAB;FXYABDAT;NBJFXY8;NBJFXY10;NBJFXY15;NBFXY;FFM;QFFM;NBFFM;INST;QINST;NBINST;NBSIGMA0;NBSIGMA20;NBSIGMA80;GLOT;QGLOT;NBGLOT;DIFT;QDIFT;NBDIFT;DIRT;QDIRT;NBDIRT;HNEIGEFTOT;QHNEIGEFTOT;HNEIGEFAB;QHNEIGEFAB;HNEIGEFDAT;NBHNEIGEF;NBJNEIG;NBJHNEIGEF1;NBJHNEIGEF5;NBJHNEIGEF10;NBJSOLNG;NEIGETOTM;QNEIGETOTM;NEIGETOTAB;QNEIGETOTAB;NEIGETOTABDAT;NBJNEIGETOT1;NBJNEIGETOT10;NBJNEIGETOT30;NBJGREL;NBJORAG;NBJBROU',
                    '01014002;ARBENT;46.278167;5.669000;534;202303;1.1;9;31;1.1;1.1;9;15;31;31;31;31;31;31;1.1;9;31;1.1;9;15;1.1;9;31;-2.2;-2.2;9;15;-2.2;9;15;31;31;31;31;31;31;31;-2.2;9;31;-2.2;-2.2;9;15;-2.2;9;15;31;31;31;31;31;31;31;31;1.1;9;1.1;9;15;31;-2.2;9;31;-2.2;9;31;31;-2.2;9;15;-2.2;9;15;100;9;15;31;100;9;15;31;100;9;31;1.1;9;31;1.1;9;1.1;9;360;9;15;31;31;31;31;1.1;9;360;9;15;31;31;31;31;1.1;9;360;9;15;31;31;31;31;1.1;9;31;3;9;31;31;31;31;3;9;31;3;9;31;3;9;31;3;9;3;9;15;31;31;31;31;31;31;3;9;3;9;15;31;31;31;31;31;31',
                    '01014002;ARBENT;46.278167;5.669000;534;202304;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
                    '',
                ],
            }),
            mensuellesRepository,
            saveProgressRepository,
        });
        assert.sameDeepMembers(await saveProgressRepository.getAlreadySaved(), [
            'MENSQ_01_1940-1949',
            'MENSQ_01_previous-1950-2022',
            'MENSQ_01_latest-2023-2024',
        ]);
        assert.sameDeepMembers(await getArrayFromAsyncGenerator(mensuellesRepository.getAll()), [
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMM: new Date('2023-01-01T00:00:00Z'),
                RR: 112.8,
                QRR: 1,
                NBRR: 31,
                RR_ME: null,
                RRAB: 17.8,
                QRRAB: 1,
                RRABDAT: 8,
                NBJRR1: 14,
                NBJRR5: 10,
                NBJRR10: 4,
                NBJRR30: 0,
                NBJRR50: 0,
                NBJRR100: 0,
                PMERM: null,
                QPMERM: null,
                NBPMERM: 0,
                PMERMINAB: null,
                QPMERMINAB: null,
                PMERMINABDAT: null,
                TX: 6.4,
                QTX: 1,
                NBTX: 31,
                TX_ME: null,
                TXAB: 17.7,
                QTXAB: 1,
                TXDAT: 1,
                TXMIN: -1.1,
                QTXMIN: 1,
                TXMINDAT: 22,
                NBJTX0: 1,
                NBJTX25: 0,
                NBJTX30: 0,
                NBJTX35: 0,
                NBJTXI20: 31,
                NBJTXI27: 31,
                NBJTXS32: 0,
                TN: -1.2,
                QTN: 1,
                NBTN: 31,
                TN_ME: null,
                TNAB: -15.7,
                QTNAB: 1,
                TNDAT: 20,
                TNMAX: 11.6,
                QTNMAX: 1,
                TNMAXDAT: 1,
                NBJTN5: 10,
                NBJTN10: 4,
                NBJTNI10: 30,
                NBJTNI15: 31,
                NBJTNI20: 31,
                NBJTNS20: 0,
                NBJTNS25: 0,
                NBJGELEE: 15,
                TAMPLIM: 7.6,
                QTAMPLIM: 1,
                TAMPLIAB: 20.2,
                QTAMPLIAB: 1,
                TAMPLIABDAT: 20,
                NBTAMPLI: 31,
                TM: 2.6,
                QTM: 1,
                NBTM: 31,
                TMM: 2.6,
                QTMM: 1,
                NBTMM: 31,
                NBJTMS24: 0,
                TMMIN: -5.6,
                QTMMIN: 1,
                TMMINDAT: 20,
                TMMAX: 14.7,
                QTMMAX: 1,
                TMMAXDAT: 1,
                UNAB: 35,
                QUNAB: 1,
                UNABDAT: 14,
                NBUN: 31,
                UXAB: 100,
                QUXAB: 1,
                UXABDAT: 31,
                NBUX: 31,
                UMM: 85,
                QUMM: 1,
                NBUM: 31,
                TSVM: 6.5,
                QTSVM: 9,
                NBTSVM: 31,
                ETP: null,
                QETP: null,
                FXIAB: 18.2,
                QFXIAB: 1,
                DXIAB: 150,
                QDXIAB: 1,
                FXIDAT: 16,
                NBJFF10: 12,
                NBJFF16: 5,
                NBJFF28: 0,
                NBFXI: 31,
                FXI3SAB: 16.7,
                QFXI3SAB: 9,
                DXI3SAB: null,
                QDXI3SAB: 0,
                FXI3SDAT: 16,
                NBJFXI3S10: 11,
                NBJFXI3S16: 2,
                NBJFXI3S28: 0,
                NBFXI3S: 31,
                FXYAB: 10.2,
                QFXYAB: 1,
                DXYAB: 150,
                QDXYAB: 1,
                FXYABDAT: 16,
                NBJFXY8: 2,
                NBJFXY10: 1,
                NBJFXY15: 0,
                NBFXY: 31,
                FFM: 1.9,
                QFFM: 1,
                NBFFM: 31,
                INST: null,
                QINST: null,
                NBINST: 0,
                NBSIGMA0: null,
                NBSIGMA20: null,
                NBSIGMA80: null,
                GLOT: null,
                QGLOT: null,
                NBGLOT: 0,
                DIFT: null,
                QDIFT: null,
                NBDIFT: 0,
                DIRT: null,
                QDIRT: null,
                NBDIRT: 0,
                HNEIGEFTOT: null,
                QHNEIGEFTOT: null,
                HNEIGEFAB: null,
                QHNEIGEFAB: null,
                HNEIGEFDAT: null,
                NBHNEIGEF: 0,
                NBJNEIG: null,
                NBJHNEIGEF1: null,
                NBJHNEIGEF5: null,
                NBJHNEIGEF10: null,
                NBJSOLNG: null,
                NEIGETOTM: 3,
                QNEIGETOTM: 9,
                NEIGETOTAB: 12,
                QNEIGETOTAB: 9,
                NEIGETOTABDAT: 19,
                NBJNEIGETOT1: 15,
                NBJNEIGETOT10: 2,
                NBJNEIGETOT30: 0,
                NBJGREL: null,
                NBJORAG: null,
                NBJBROU: null,
            },
            {
                NUM_POSTE: '01014002',
                NOM_USUEL: 'ARBENT',
                LAT: 46.278167,
                LON: 5.669,
                ALTI: 534,
                AAAAMM: new Date('2023-02-01T00:00:00Z'),
                RR: 19.4,
                QRR: 1,
                NBRR: 28,
                RR_ME: null,
                RRAB: 9.8,
                QRRAB: 1,
                RRABDAT: 23,
                NBJRR1: 5,
                NBJRR5: 1,
                NBJRR10: 0,
                NBJRR30: 0,
                NBJRR50: 0,
                NBJRR100: 0,
                PMERM: null,
                QPMERM: null,
                NBPMERM: 0,
                PMERMINAB: null,
                QPMERMINAB: null,
                PMERMINABDAT: null,
                TX: 10.7,
                QTX: 1,
                NBTX: 28,
                TX_ME: null,
                TXAB: 17.3,
                QTXAB: 1,
                TXDAT: 21,
                TXMIN: 3.2,
                QTXMIN: 1,
                TXMINDAT: 26,
                NBJTX0: 0,
                NBJTX25: 0,
                NBJTX30: 0,
                NBJTX35: 0,
                NBJTXI20: 28,
                NBJTXI27: 28,
                NBJTXS32: 0,
                TN: -3.7,
                QTN: 1,
                NBTN: 28,
                TN_ME: null,
                TNAB: -10.3,
                QTNAB: 1,
                TNDAT: 10,
                TNMAX: 5.9,
                QTNMAX: 1,
                TNMAXDAT: 18,
                NBJTN5: 13,
                NBJTN10: 1,
                NBJTNI10: 28,
                NBJTNI15: 28,
                NBJTNI20: 28,
                NBJTNS20: 0,
                NBJTNS25: 0,
                NBJGELEE: 21,
                TAMPLIM: 14.4,
                QTAMPLIM: 1,
                TAMPLIAB: 23.4,
                QTAMPLIAB: 1,
                TAMPLIABDAT: 13,
                NBTAMPLI: 28,
                TM: 3.5,
                QTM: 1,
                NBTM: 28,
                TMM: 2.4,
                QTMM: 1,
                NBTMM: 28,
                NBJTMS24: 0,
                TMMIN: -1.8,
                QTMMIN: 1,
                TMMINDAT: 10,
                TMMAX: 10.2,
                QTMMAX: 1,
                TMMAXDAT: 18,
                UNAB: 26,
                QUNAB: 1,
                UNABDAT: 13,
                NBUN: 28,
                UXAB: 100,
                QUXAB: 1,
                UXABDAT: 25,
                NBUX: 28,
                UMM: 82,
                QUMM: 1,
                NBUM: 28,
                TSVM: 6.0,
                QTSVM: 9,
                NBTSVM: 28,
                ETP: null,
                QETP: null,
                FXIAB: 25.5,
                QFXIAB: 1,
                DXIAB: 40,
                QDXIAB: 1,
                FXIDAT: 26,
                NBJFF10: 3,
                NBJFF16: 1,
                NBJFF28: 0,
                NBFXI: 28,
                FXI3SAB: 23.0,
                QFXI3SAB: 9,
                DXI3SAB: null,
                QDXI3SAB: 0,
                FXI3SDAT: 26,
                NBJFXI3S10: 3,
                NBJFXI3S16: 1,
                NBJFXI3S28: 0,
                NBFXI3S: 28,
                FXYAB: 12.6,
                QFXYAB: 1,
                DXYAB: 10,
                QDXYAB: 1,
                FXYABDAT: 26,
                NBJFXY8: 1,
                NBJFXY10: 1,
                NBJFXY15: 0,
                NBFXY: 28,
                FFM: 1.4,
                QFFM: 1,
                NBFFM: 28,
                INST: null,
                QINST: null,
                NBINST: 0,
                NBSIGMA0: null,
                NBSIGMA20: null,
                NBSIGMA80: null,
                GLOT: null,
                QGLOT: null,
                NBGLOT: 0,
                DIFT: null,
                QDIFT: null,
                NBDIFT: 0,
                DIRT: null,
                QDIRT: null,
                NBDIRT: 0,
                HNEIGEFTOT: null,
                QHNEIGEFTOT: null,
                HNEIGEFAB: null,
                QHNEIGEFAB: null,
                HNEIGEFDAT: null,
                NBHNEIGEF: 0,
                NBJNEIG: null,
                NBJHNEIGEF1: null,
                NBJHNEIGEF5: null,
                NBJHNEIGEF10: null,
                NBJSOLNG: null,
                NEIGETOTM: 0,
                QNEIGETOTM: 9,
                NEIGETOTAB: 0,
                QNEIGETOTAB: 9,
                NEIGETOTABDAT: null,
                NBJNEIGETOT1: 0,
                NBJNEIGETOT10: 0,
                NBJNEIGETOT30: 0,
                NBJGREL: null,
                NBJORAG: null,
                NBJBROU: null,
            },
            {
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
                DXIAB: 0,
                QDXIAB: 9,
                FXIDAT: 15,
                NBJFF10: 31,
                NBJFF16: 31,
                NBJFF28: 31,
                NBFXI: 31,
                FXI3SAB: 1.1,
                QFXI3SAB: 9,
                DXI3SAB: 0,
                QDXI3SAB: 9,
                FXI3SDAT: 15,
                NBJFXI3S10: 31,
                NBJFXI3S16: 31,
                NBJFXI3S28: 31,
                NBFXI3S: 31,
                FXYAB: 1.1,
                QFXYAB: 9,
                DXYAB: 0,
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
            },
            {
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
            },
        ]);
    });
});
