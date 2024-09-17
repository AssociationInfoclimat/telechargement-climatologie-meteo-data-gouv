export const DATASETS_IDS = {
    infrahoraire: '6569ad61106d1679c93cdf77',
    horaire: '6569b4473bedf2e7abad3b72',
    quotidienne: '6569b51ae64326786e4e8e1a',
    mensuelle: '6569b3d7d193b4daf2b43edc',
    decadaire: '6569b4a48a4161faec6b2779',
    decadaireAgro: '6569af36ba0c3d2f9d4bf98c',
} as const;

export type DatasetId = (typeof DATASETS_IDS)[keyof typeof DATASETS_IDS];
