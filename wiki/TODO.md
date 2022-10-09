- Add missing Unit tests:
    - UserNotes vue components:
        - src/components/Notes/NotesLeftPanel.vue
        - src/components/Notes/OpenNote.vue
        - src/views/UserNotes.vue
    - Websocket & Group chat feature:
        - src/App.vue
        - src/store/webSocket.ts
        - src/utils/webSocketUtils/index.ts
        - src/views/GroupChat.vue

- Add missing E2E tests:
    - Feature - user notes
    - Feature - group chat

- Parallelize each cypress test

- GUI Display cypress interactive when running in Docker
    - https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/
