import { InfrahoraireLine } from '@/csv/infrahoraires/parseCSV.js';
import { InfrahoraireDTO } from '@/db/infrahoraires/DTO.js';

export function toDTO(line: InfrahoraireLine): InfrahoraireDTO {
    return {
        NUM_POSTE: line.NUM_POSTE.value(),
        NOM_USUEL: line.NOM_USUEL,
        LAT: line.LAT,
        LON: line.LON,
        ALTI: line.ALTI,
        AAAAMMJJHHMN: line.AAAAMMJJHHMN,
        RR: line.RR.value(),
        QRR: line.QRR.value(),
    };
}
