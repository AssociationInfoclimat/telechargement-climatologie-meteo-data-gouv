export const DATASETS_IDS = {
    infrahoraire: '6569ad61106d1679c93cdf77',
    infrahoraireComp: '67910698aae7f4e70034cf7e',
    horaire: '6569b4473bedf2e7abad3b72',
    horaireComp: '6791055a6d553b689a5e2ba4',
    quotidienne: '6569b51ae64326786e4e8e1a',
    quotidienneComp: '679103e271c55090cfe86871',
    mensuelle: '6569b3d7d193b4daf2b43edc',
    mensuelleComp: '6791045ba9116b0a49e6a720',
    decadaire: '6569b4a48a4161faec6b2779',
    decadaireComp: '679105fab4d7bba9aa3fd4be',
    decadaireAgro: '6569af36ba0c3d2f9d4bf98c',
    decadaireAgroComp: '67910646543edd2701937075',
} as const;

export type DatasetId = (typeof DATASETS_IDS)[keyof typeof DATASETS_IDS];
