tsx ./src/apps/saveInfrahorairesCSVsToDB.ts >> ./logs/saveInfrahorairesCSVsToDB.log 2>> ./logs/saveInfrahorairesCSVsToDB.error.log &
tsx ./src/apps/saveHorairesCSVsToDB.ts >> ./logs/saveHorairesCSVsToDB.log 2>> ./logs/saveHorairesCSVsToDB.error.log &
tsx ./src/apps/saveQuotidiennesRRTVentCSVsToDB.ts >> ./logs/saveQuotidiennesRRTVentCSVsToDB.log 2>> ./logs/saveQuotidiennesRRTVentCSVsToDB.error.log &
tsx ./src/apps/saveQuotidiennesAutresParametresCSVsToDB.ts >> ./logs/saveQuotidiennesAutresParametresCSVsToDB.log 2>> ./logs/saveQuotidiennesAutresParametresCSVsToDB.error.log &
tsx ./src/apps/saveMensuellesCSVsToDB.ts >> ./logs/saveMensuellesCSVsToDB.log 2>> ./logs/saveMensuellesCSVsToDB.error.log &
tsx ./src/apps/saveDecadairesCSVsToDB.ts >> ./logs/saveDecadairesCSVsToDB.log 2>> ./logs/saveDecadairesCSVsToDB.error.log &
tsx ./src/apps/saveDecadairesAgroCSVsToDB.ts >> ./logs/saveDecadairesAgroCSVsToDB.log 2>> ./logs/saveDecadairesAgroCSVsToDB.error.log &
