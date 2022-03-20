- Vue project created following standard instructions from https://cli.vuejs.org/guide/creating-a-project.html
- Used Vue official unit testing jest plugin https://cli.vuejs.org/core-plugins/unit-jest.html
- Used Vue official e2e cypress plugin https://cli.vuejs.org/core-plugins/e2e-cypress.html

- Vuetify added by following standard instructions from https://vuetifyjs.com/en/getting-started/installation/

- Correctly adding vuetify plugin before every unit test:
    - https://vuetifyjs.com/en/getting-started/unit-testing/#bootstrapping-vuetify
    - https://v2.vuetifyjs.com/en/getting-started/unit-testing/

- Add jest to eslint (useful when creating manual mocks, or using jest in non *.spec.js files)
    - https://stackoverflow.com/questions/41324636/how-can-i-import-jest

- Added axios mocking for unit testing from examples:
    - https://jestjs.io/docs/es6-class-mocks
    - https://jestjs.io/docs/mock-functions

- Before executing unit tests, set environment variables as defined in .env files
    - https://github.com/vuejs/vue-test-utils/issues/193 ( require('dotenv').config() did not work) 
    - https://lusbuab.medium.com/using-dotenv-with-jest-7e735b34e55f

- Resolving Vuetify V-dialog unit testing warning:
    - https://forum.vuejs.org/t/vuetify-data-app-true-and-problems-rendering-v-dialog-in-unit-tests/27495/8

- installed packages
    - axios
        - for making http calls
- installed dev packages
    - jest-mock-axios

- Docker
    - TDD Live Unit Tests Reload - Vue Test Utils - To make jest work with '--watch':
        - https://stackoverflow.com/questions/60768371/running-jest-in-watch-mode-in-a-docker-container-in-a-subdirectory-of-git-root
    - Node Image with Cypress: https://docs.cypress.io/examples/examples/docker#Images
