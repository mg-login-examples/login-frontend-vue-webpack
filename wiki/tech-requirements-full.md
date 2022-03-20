# Technical Requirements
*Write specs such that they are directly transferable as tests for TDD*
---
## Vue Components
### App
- topbar component at app component level ✅
- vue router at app component level ✅
- snackbar at app component level ✅
### Public page
- must have title 'public page' ✅
- on init, must call store function to update public items ✅
- must get public items from store ✅
- must display list of public items ✅
### Private page
- must have title 'private page' ✅
- on init, must call store function to update private items ✅
- must get private items from store ✅
- must display list of private items ✅
### Topbar
- 'items for all' button:
    - must be visible ✅
    - must have router-link as prop with correct value ✅
- 'items for logged in' button:
    - must be visible ✅
    - must have router-link as prop with correct value ✅
### Snackbar
- must render error message from store ✅
- must render close button ✅
- must display snackbar when store isOpenSnackbar value is set to true ✅
- snackbar should disappear if close button is pressed ✅
- snackbar should disappear automatically after 5 seconds ✅
---
## Vue router
- vue router must load public-page view if url is '/' ✅
- vue router must load private-page view if url is '/private' ✅
---
## Vuex store
### Public/Private items
- must have mutation to set public item in state ✅
- must have mutation to set private item in state ✅
- must have action to fetch public item from backend and commit mutation ✅
    - must handle http error ✅
- must have action to fetch private item from backend and commit mutation ✅
    - must handle http error ✅
### App Global Error Tracking
- must have mutation to set error message in state ✅
- must have mutation to set openSnackbar in state ✅
- must have action that commits openSnackbar (used by Vuetify snackbar to auto close snackbar) ✅
- must have action that:
    - calls error handler function ✅
    - commits error message and sets open snackbar to true ✅
### Utils
- handle error:
    - must handle axios no connection error ✅
    - unknown error
        - in dev/local mode
            - must log error ✅
            - must return error message ✅
        - in prod/staging mode
            - must not log error ✅
            - must return unknown error message ✅
- log error:
    - must log error object ✅
    - must log error message ✅
    - must log error request if available ✅
    - must log error response if available ✅
---
## Backend API Service
### Items Module
- Using axios as base http object:
    - must set axios baseURL based on environment type ✅
    - must set axios crossDomain to true ✅
- must have endpoint to get public items ✅
- must have endpoint to get private items ✅
### Root Api Object
- must include items module inside backend api service ✅

# A functional Login Page
- Login page must have username, password inputs
- Login page must have submit button
- Having entered valid credentials and clicking on submit button should lead to private page
- Having entered invalid credentials and clicking on submit button should lead to 