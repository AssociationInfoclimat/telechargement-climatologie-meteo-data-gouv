# Téléchargement des données de climatologie de meteo.data.gouv.fr

## Outils

- Packages manager : pnpm (et non npm)
- Formatting : Prettier
- Linter : ESLint
- Tests : Vitest
- ORM : Prisma
- Git Hooks : Husky && lint-staged

## Workflow de développement

1. Lancer `pnpm run prepare` pour installer Husky
2. Démarrer Docker sur la machine
3. Démarrer le container avec `pnpm run start-docker`
4. Préparer la base de données avec `pnpm run migrate:dev`
5. À chaque commit, tous les fichiers seront formatés et lintés automatiquement, et tous les tests seront exécutés. Le commit sera annulé si une erreur survient.

À chaque modification du schéma de la base de données (prisma/schema.prisma), il faut exécuter `pnpm run migrate:dev` pour mettre à jour la base de données.

Regarder le package.json pour la liste complète des commandes disponibles, notamment pour les tests, ou l'exécution des différents scripts.

## Analyse d'empreinte mémoire

### Suivi de la mémoire

1. Le 2025-03-04, départements : 29, 76, 75, 15, 06, 974
2. Avant téléchargement : 64.96 Go restants
3. Après téléchargement : 40.78 Go restants (donc 24.18 Go de csv.gz)
4. Après décompression de 29 : 36.13 Go restants (donc 4.65 Go de csv)
5. Après décompression de 76 : 33.86 Go restants (donc 2.27 Go de csv)
6. Après décompression de 75 : 32.54 Go restants (donc 1.32 Go de csv)
7. Après décompression de 15 : 29.45 Go restants (donc 3.09 Go de csv)
8. Après décompression de 06 : 22.37 Go restants (donc 7.08 Go de csv)
9. Après décompression de 974 : 11.93 Go restants (donc 10.44 Go de csv)
10. Après suppression des csv : 39.59 Go restants (donc 27.66 Go de csv)
11. Avant ingestion de 29 : 41.50 Go restants
12. Après ingestion de 29 : 27.36 Go restants (donc 14.14 Go de rows vs 4.65 Go de csv)
13. Après ingestion de 76 : 24.85 Go restants (donc 2.51 Go de rows vs 2.27 Go de csv)
14. Après ingestion de 75 : 24.22 Go restants (donc 0.63 Go de rows vs 1.32 Go de csv)
15. Après ingestion de 15 : 16.14 Go restants (donc 8.08 Go de rows vs 3.09 Go de csv)
16. Plus de place durant l'ingestion de 06, redémarrage du Mac, 26.29 Go de libre ???
17. Après ingestion de 06 : 14.28 Go restants (donc 12.01 Go de rows vs 7.08 Go de csv)
18. Plus de place durant l'ingestion de 974 (700 Mo restants), arrêt du script, suppression des rows, mais aucun gain de place ???

- CSV :
  - Total sélection : 4.65 + 2.27 + 1.32 + 3.09 + 7.08 = 18.41 Go
  - Mo moyens / station = 18 410 / 714 = 25.784 Mo
  - Projection total = 25.784 * 15 416 = 397 486 Mo = 397 Go
- Rows :
  - Total sélection : 14.14 + 2.51 + 0.63 + 8.08 + 12.01 = 37.37 Go
  - Mo moyens / station = 37 370 / 714 = 52.338
  - Projection total = 52.338 * 15 416 = 806 843 Mo = 807 Go

### Métadonnées stations

- 29
  - Stations : 142 + 15 = 157
  - Début : 1850
  - Infrahoraire : 28 661 503
  - Horaire : 7 835 651
  - Quotidienne : 1 322 647
  - QuotidienneAutresParametres : 505 038
  - Mensuelle : 49 695
  - Decadaire : 131 263
  - DecadaireAgro : 41 430
  - Total : 38 547 227
- 76
  - Stations : 146 + 0 = 146
  - Début : 1840
  - Infrahoraire : 17 605 427
  - Horaire : 2 644 909
  - Quotidienne : 1 117 433
  - QuotidienneAutresParametres : 365 726
  - Mensuelle : 56 327
  - Decadaire : 110 213
  - DecadaireAgro : 15 546
  - Total : 21 915 581
- 75
  - Stations : 58 + 0 = 58
  - Début : 1810
  - Infrahoraire : 5 031 030
  - Horaire : 1 610 799
  - Quotidienne : 865 441
  - QuotidienneAutresParametres : 187 980
  - Mensuelle : 36 590
  - Decadaire : 86 110
  - DecadaireAgro : 12 018
  - Total : 7 829 968
- 15
  - Stations : 138 + 5 = 143
  - Début : 1860
  - Infrahoraire : 21 542 697
  - Horaire : 4 553 193
  - Quotidienne : 1 627 618
  - QuotidienneAutresParametres : 853 850
  - Mensuelle : 57 304
  - Decadaire : 161 980
  - DecadaireAgro : 16 628
  - Total : 28 813 270
- 06
  - Stations : 209 + 1 = 210
  - Début : 1880
  - Infrahoraire : 53 676 553
  - Horaire : 10 335 348
  - Quotidienne : 1 858 470
  - QuotidienneAutresParametres : 770 846
  - Mensuelle : 67 165
  - Decadaire : 184 148
  - DecadaireAgro : 55 526
  - Total : 66 948 056
- (974)
  - Stations : 251 + 4 = 255
  - Début : 1900
  - Infrahoraire : TODO
  - Horaire : TODO
  - Quotidienne : TODO
  - QuotidienneAutresParametres : TODO
  - Mensuelle : TODO
  - Decadaire : TODO
  - DecadaireAgro : TODO
  - Total : TODO
- Total sélection
  - Stations : 693 + 21 = 714 (944 + 25 = 969)
  - Infrahoraire : 126 517 210
  - Horaire : 26 979 900
  - Quotidienne : 6 791 609
  - QuotidienneAutresParametres : 2 683 440
  - Mensuelle : 267 081
  - Decadaire : 673 714
  - DecadaireAgro : 141 148
  - Total : 164 054 102
- Total
  - Stations : 14 723 + 693 = 15 416
  - Rows moyens / station = 164 054 102 / 714 = 229 767
  - Projection rows total = 229 767 * 15 416 = 3 542 088 072
