@quote-feature
Feature: All Quotes

  Scenario: View all quotes
    Given a quote exists
    When I open all quotes view
    Then I see a quote
