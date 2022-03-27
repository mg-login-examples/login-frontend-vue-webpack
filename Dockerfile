# install stage
FROM node:16.14-alpine as install-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Add Git to run tests with '--watch' flag
RUN apk update
RUN apk add git




# unit-test stages
FROM install-stage as test-unit-stage
CMD [ "npm", "run", "test:unit"]
# CMD [ "npm", "run", "test:unit:watch"]

# serve stage
FROM install-stage as serve-local-stage
EXPOSE 8080
CMD [ "npm", "run", "serve" ]


# serve stage
FROM install-stage as serve-dev-stage
EXPOSE 8080
CMD [ "npm", "run", "serve", "--", "--mode", "development" ]




# build stage
FROM install-stage as build-stage
RUN npm run build

# production stage
FROM nginx:stable-alpine as serve-prod-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# build stage development
FROM install-stage as build-dev-stage
RUN npm run build -- --mode development

# production stage
FROM nginx:stable-alpine as serve-dev-built-stage
COPY --from=build-dev-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]