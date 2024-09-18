export const FREQUENCES = {
    infrahoraire: 'MN',
    horaire: 'H',
    quotidienne: 'Q',
    mensuelle: 'MENSQ',
    decadaire: 'DECADQ',
    decadaireAgro: 'DECADAGRO',
} as const;

export type Frequence = (typeof FREQUENCES)[keyof typeof FREQUENCES];
