export const FREQUENCES = {
    infrahoraire: 'MN',
    horaire: 'H',
    quotidienne: 'Q_RR-T-Vent',
    quotidienneAutresParametres: 'Q_autres-parametres',
    mensuelle: 'MENSQ',
    decadaire: 'DECADQ',
    decadaireAgro: 'DECADAGRO',
} as const;

export type Frequence = (typeof FREQUENCES)[keyof typeof FREQUENCES];
