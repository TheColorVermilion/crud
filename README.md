# crud
SDI Z prefix app

to run the app I :
CD'ed into frontend file and spm start
in seprate terminal CD'ed into Backend file and npm start
with docker extension installed in VSCode right click on docker-compose.yaml and "run docker compse up"

alternate methods
(ie docker run --rm --name pg-docker -e POSTGRES_PASSWORD=postgres -d -p 5433:5432\ -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres) of running database may be possible but your mileage may vary

currently when you create a new item and it instatly links you to the user inventory page the new item isnt shown
not 100% how to fix but if i have time i will try, it does show up if you hit home and then back to the inventory