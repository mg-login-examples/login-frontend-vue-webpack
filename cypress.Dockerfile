# install stage
FROM cypress/base:14.16.0 as install-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# e2e-test stage
FROM install-stage as test-e2e-stage
CMD [ "npm", "run", "test:e2e", "--", "--headless"]

# e2e-test stage
# FROM install-stage as test-e2e-external-stage
# CMD [ "npm", "run", "test:e2e", "--", "--headless", "--url", "<todo-url_env_variable>"]
