import { DecadaireAgroLine } from '@/csv/decadaires-agro/parseCSV.js';
import { DecadaireAgroDTO } from '@/db/decadaires-agro/DTO.js';

export function toDTO(line: DecadaireAgroLine): DecadaireAgroDTO {
    return {
        NUM_POSTE: line.NUM_POSTE.value(),
        NOM_USUEL: line.NOM_USUEL,
        LAT: line.LAT,
        LON: line.LON,
        ALTI: line.ALTI,
        AAAAMM: line.AAAAMM,
        NUM_DECADE: line.NUM_DECADE.value(),
        RR: line.RR.value(),
        CRR: line.CRR.value(),
        TN: line.TN,
        CTN: line.CTN.value(),
        TX: line.TX,
        CTX: line.CTX.value(),
        FFM: line.FFM.value(),
        CFFM: line.CFFM.value(),
        TSVM: line.TSVM.value(),
        CTSVM: line.CTSVM.value(),
        INST: line.INST.value(),
        CINST: line.CINST.value(),
        GLOT: line.GLOT.value(),
        CGLOT: line.CGLOT.value(),
        ETP: line.ETP.value(),
    };
}
