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

seems to be an issue with the deployed site with logins but the local build functioned>> this is likely due to all the apiURL swapping over to the deployed should probably set up a function to test if the deployed api is getting a response but as its pretty late on day 3 im just going to leave the local dev ip in a comment

somehow the deployed DB keeps breaking not sure what is causing it i suspesct it has to do with my workaround for render.coms console being paid, i initiated the start script with the knex migrate/seed commands and i think when the database auto redeploys upon github push it breaks the db but not 100% sure RIGHT NOW everything is working and ive turned off auto redeploy so hopfully its still running when this gets graded but if not you may have to run completely locally

added screenshots of it functional on deployed domain