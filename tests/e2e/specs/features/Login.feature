Feature: Login

  Scenario: Login with valid user
    Given a user with userId 1 exists
    When I go to login page
    And I enter my userId 1
    And I click on login button
    Then logout button is displayed on topbar
    And I am redirected to All Quotes page

  Scenario: Login with invalid user
    Given an invalid userId 0 for which no user exists
    When I go to login page
    And I enter my userId 0
    And I click on login button
    Then logout button is not displayed on topbar
    And I am redirected to login page
