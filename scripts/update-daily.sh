cd /opt/telechargement-climatologie-meteo-data-gouv \
&& pnpm run update-latest-archives \
&& pnpm run download-unzip-update-delete-latest-infrahoraires-csvs:preprod \
&& pnpm run download-unzip-update-delete-latest-horaires-csvs:preprod \
&& pnpm run download-unzip-update-delete-latest-quotidiennes-csvs:preprod
