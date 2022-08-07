@quote-feature
Feature: All Quotes

  Scenario: View all quotes
    Given a quote exists
    When I open all quotes view
    Then I see a quote

  # Test can fail when high number of quotes
  # Scenario: View another user's quote
  #   Given I am logged in as a user with email "some_user@fakemail.com" and password "12345678"
  #   And I have created a quote "my unique quote"
  #   And I have logged out
  #   When I open all quotes view
  #   Then I see a quote with text "my unique quote" by author "some_user"
