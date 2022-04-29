Feature: Logout

  Scenario: Logout from Topbar
    Given I am logged in as a user with email "logout_test_user@fakemail.com" and password "12345678"
    When I click on logout button
    Then login button is displayed on topbar
    And I am redirected to All Quotes page
