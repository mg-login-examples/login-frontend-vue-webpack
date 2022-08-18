#!/bin/sh
case=${1:-default}
if [ $case = "launch-frontend-local" ]
then
   # Stop all frontend project's containers and build and start vueapp container
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -p frontend up --build
elif [ $case = "launch-frontend-cloud-dev" ]
then
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   export PRIMARY_DOMAIN="login-example.duckdns.org"
   export VUE_MODE="cloud_dev"
   docker-compose -f docker-compose.yml -f compose.vueapp_static.yml -p frontend up --build -d
elif [ $case = "launch-tdd" ]
then
   # Stop all frontend project's containers, build vueapp container and run unit tests with watch
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -p frontend run vueapp_serve npm run test:unit -- --watch
elif [ $case = "run-unit-tests" ]
then
   # Stop all frontend project's containers, build vueapp container and run unit tests
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -p frontend run vueapp_serve npm run test:unit
elif [ $case = "run-e2e-tests" ]
then
   # Stop all frontend project's containers, build all frontend project's containers including backend and run e2e tests
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vuecypress.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend build
   docker-compose -f docker-compose.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend run fastapi python main.py alembic upgrade head
   export BACKEND_ADMIN_USER_EMAIL="test_admin@fakemail.com"
   export BACKEND_ADMIN_USER_PASSWORD="secretpwd"
   docker-compose -f docker-compose.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend run fastapi python main.py add_admin_user $BACKEND_ADMIN_USER_EMAIL $BACKEND_ADMIN_USER_PASSWORD
   export CYPRESS_ENV_FILE=.env_cypress.ci_e2e
   export CYPRESS_VIDEO=true
   export CYPRESS_MAILSLURP_API_KEY=$CYPRESS_MAILSLURP_API_KEY
   export CYPRESS_ADMIN_API_LOGIN_USERNAME=$BACKEND_ADMIN_USER_EMAIL
   export CYPRESS_ADMIN_API_LOGIN_PASSWORD=$BACKEND_ADMIN_USER_PASSWORD
   # export CYPRESS_TAGS=@tag1,@tag2
   export SAMESITE=none
   docker-compose -f docker-compose.yml -f compose.vuecypress.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend run vueapp_test_e2e npm run test:e2e -- --headless --mode ci_e2e --browser chrome
elif [ $case = "launch-fullstack-local" ]
then
   # Stop all frontend project's containers, build and run all frontend project's containers including backend
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.fastapi.yml -f compose.mysql.yml -p frontend up --build
elif [ $case = "down" ]
then
   # Stop all backend project's containers
   docker-compose -f docker-compose.yml -f compose.vueapp_compiled.yml -f compose.vueapp_static.yml -f compose.fastapi.yml -f compose.mysql.yml -f compose.vuecypress.yml -p frontend down
else
   echo $CYPRESS_MAILSLURP_API_KEY
   echo "no option passed"
   echo "available options are:
    - launch-frontend-local
    - launch-frontend-cloud-dev
    - launch-tdd
    - run-unit-tests
    - run-e2e-tests
    - launch-fullstack-local
    - down
    "
fi