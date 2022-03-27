# frontend

### Unit Tests
- Run All Unit Tests
    - Build Docker Image & Start Containers: ```docker compose -f docker-compose.test.yml -p frontend --profile unit-test up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose --profile unit-test down```
- Run Unit Tests Watch For TDD (with Live Reload)
    - Start Containers: ```docker compose -f docker-compose.test.yml -p frontend --profile unit-test run vueapp_test_unit npm run test:unit:watch```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend_tdd --profile unit-test down```

### Serve Code
- Serve Dev (Accessible at http://localhost:8019)
    - Build Docker Image & Start Containers: ```docker compose -p frontend --profile frontend-dev-built-serve up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend --profile frontend-dev-serve down```
- Serve Dev Built (Accessible at http://localhost:8019)
    - Build Docker Image & Start Containers: ```docker compose -p frontend --profile frontend-dev-built-serve up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend --profile frontend-dev-built-serve down```
- Serve Production (Accessible at http://localhost:8010)
    - Build Docker Image & Start Containers: ```docker compose -p frontend --profile frontend-prod-serve up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend --profile frontend-prod-serve down```
- Serve Fullstack (Accessible at http://localhost:8019)
    - **PREREQUISITES**
        - Clone repo **inside** project directory: ```git clone https://github.com/mg-login-examples/login-backend-fastapi.git```
    - Build Docker Image & Start Containers: ```docker compose -p frontend --profile fullstack-serve up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend --profile fullstack-serve down```
### E2E Tests
- E2E Tests Locally
    - **PREREQUISITES**
        - Clone repo **inside** project directory: ```git clone https://github.com/mg-login-examples/login-backend-fastapi.git```
    - Start Containers: ```docker compose -f docker-compose.test.xml -p frontend --profile fullstack-e2e-test up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend --profile fullstack-e2e-test down```
<!-- - E2E Tests Against Deployed
    - Start Containers: ```docker compose - frontend --profile test-e2e-prod up --build```
    - Stop Containers: ```CTRL+C```
    - Delete Containers: ```docker compose -p frontend --profile test-e2e-prod down```


## Project creation
- Vue project created using Vue CLI
```
    vue create frontend 
    -> preset: Manually select features 
    ->  Choose Vue 3, Typescript, Babel, Router, Pinia, Linter/Formatter, Unit Testing (Jest + Vue Test Utils 2), E2E (cypress)

```
- Add Css Framework
```
    Tailwind.css
```



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
