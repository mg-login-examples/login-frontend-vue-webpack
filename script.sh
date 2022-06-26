#!/bin/sh
case=${1:-default}
if [ $case = "launch-frontend-only-local" ]
then
   # Stop all frontend project's containers and build and start vueapp container
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend up --build
elif [ $case = "launch-frontend-only-dev-env" ]
then
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend run -d --service-ports vueapp_serve npm run serve -- --mode ec2_main
elif [ $case = "launch-tdd" ]
then
   # Stop all frontend project's containers, build vueapp container and run unit tests with watch
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend run vueapp_serve npm run test:unit -- --watch
elif [ $case = "run-unit-tests" ]
then
   # Stop all frontend project's containers, build vueapp container and run unit tests
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -p frontend run vueapp_serve npm run test:unit
elif [ $case = "run-e2e-tests" ]
then
   # Stop all frontend project's containers, build all frontend project's containers including backend and run e2e tests
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vuecypress.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend run fastapi python main.py create_db_tables
   docker-compose -f docker-compose.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend run fastapi python main.py add_admin_user test_admin@fakemail.com secretpwd
   export CYPRESS_ENV_FILE=.env_cypress.ci_e2e
   export CYPRESS_VIDEO=false
   docker-compose -f docker-compose.yml -f compose.vuecypress.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend run vueapp_test_e2e npm run test:e2e -- --headless --mode ci_e2e
elif [ $case = "launch-fullstack-local" ]
then
   # Stop all frontend project's containers, build and run all frontend project's containers including backend
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.traefik.yml -p frontend up --build
elif [ $case = "launch-backend-only" ]
then
   # Stop all frontend project's containers, build and run all frontend project's containers including backend
   docker-compose -f docker-compose.yml -f compose.vueapp.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend up --build
else
   echo "no option passed"
   echo "available options are:
    - launch-frontend-only-local
    - tdd
    - run-unit-tests
    - run-e2e-tests
    "
fi