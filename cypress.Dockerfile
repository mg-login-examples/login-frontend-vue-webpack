# install stage
FROM cypress/base:16.14.0 as install-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV CI=1

CMD [ "npm", "run", "test:e2e", "--", "--headless"]
# CMD [ "npm", "run", "test:e2e", "--", "--headless", "--url", "<todo-url_env_variable>"]
