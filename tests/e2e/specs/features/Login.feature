Feature: Login

  Scenario: Login with valid user
    Given a user with email "me@fakemail.com" and password "12345678" exists
    When I go to login page
    And I enter the user email "me@fakemail.com"
    And I enter the user password "12345678"
    And I click on login button
    Then logout button is displayed on topbar
    And I am redirected to All Quotes page

  Scenario: Login with invalid user
    Given an invalid user login with email "invalid_user@fakemail.com" and password "some-password"
    When I go to login page
    And I enter the user email "invalid_user@fakemail.com"
    And I enter the user password "some-password"
    And I click on login button
    Then logout button is not displayed on topbar
    And I am redirected to login page
