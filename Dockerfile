# install stage
FROM node:16.14-alpine as install-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Add Git to run tests with '--watch' flag
RUN apk update
RUN apk add git

# serve stage
FROM install-stage as serve-local-stage
EXPOSE 8080
CMD [ "npm", "run", "serve" ]
# CMD [ "npm", "run", "test:unit"]
# CMD [ "npm", "run", "test:unit:watch"]


# build stage
FROM install-stage as build-stage
ARG VUE_MODE="production"
RUN npm run build -- --mode ${VUE_MODE}

# production stage
FROM nginx:stable-alpine as serve-static-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
