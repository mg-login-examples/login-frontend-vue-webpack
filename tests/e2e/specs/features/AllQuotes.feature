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


  Scenario: Like A Quote
    Given I am logged in as a user with email "like_quote_creator@fakemail.com" and password "12345678"
    And I have created a quote "random > all quotes > like quote"
    And I have logged out
    And I am logged in as a user with email "all_quotes_test@fakemail.com" and password "12345678"
    And an unliked quote exists with text "webpage > all quotes > like quote" and author with username different from "all_quotes_test"
    When I hover on the quote with text "webpage > all quotes > like quote"
    Then the like button for the quote with text "webpage > all quotes > like quote" is visible
    When I click on like button for the quote with text "webpage > all quotes > like quote"
    Then the quote with text "webpage > all quotes > like quote" is liked
    When I do not hover on the quote with text "webpage > all quotes > like quote"
    Then the quote with text "webpage > all quotes > like quote" is liked

  Scenario: Unlike A Quote
    Given I am logged in as a user with email "like_quote_creator@fakemail.com" and password "12345678"
    And I have created a quote "random > all quotes > unlike quote"
    And I have logged out
    And I am logged in as a user with email "all_quotes_test@fakemail.com" and password "12345678"
    And I have liked an unliked quote with text "webpage > all quotes > unlike quote" and author with username different from "all_quotes_test"
    When I click on unlike button for the quote with text "webpage > all quotes > unlike quote"
    Then the quote with text "webpage > all quotes > unlike quote" is not liked
