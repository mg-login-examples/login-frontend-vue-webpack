Feature: Login

  Scenario: Login with valid user
    Given a user with email "me@fakemail.com" and password "12345678" exists
    When I go to login page
    And I enter the login user email "me@fakemail.com"
    And I enter the login user password "12345678"
    And I click on remember me
    And I click on login button
    Then logout button is displayed on topbar
    And I am redirected to All Quotes page

  Scenario: Login with invalid user
    Given an invalid user login with email "invalid_user@fakemail.com" and password "some-password"
    When I go to login page
    And I enter the login user email "invalid_user@fakemail.com"
    And I enter the login user password "some-password"
    And I click on login button
    Then logout button is not displayed on topbar
    And I am redirected to login page

  Scenario: Toggle show password text
    Given I go to login page
    When I enter the login user password "some-password"
    Then the login password text is hidden
    When I click on toggle show login password
    Then the login password text is visible
    When I click on toggle show login password
    Then the login password text is hidden

  # @example-tag
  Scenario: Redirect to login page, and after login, redirect to requested page
    Given a user with email "me@fakemail.com" and password "12345678" exists
    And I try to open my quotes view
    Then I am redirected to login page
    And I enter the login user email "me@fakemail.com"
    And I enter the login user password "12345678"
    And I click on login button
    Then I am redirected to My Quotes page
