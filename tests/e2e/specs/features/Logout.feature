Feature: Logout

  Scenario: Logout from Topbar
    Given I am logged in as a user with userId 1
    When I click on logout button
    Then login button is displayed on topbar
    And I am redirected to All Quotes page
