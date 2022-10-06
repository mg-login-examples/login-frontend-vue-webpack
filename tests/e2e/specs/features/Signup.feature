@signup
Feature: Signup

  Scenario: Signup and verify email
    # Given a real email address "external > signup > email" exists on Mailslurp with account id "external > signup > account id"
    Given no user with email "external > signup > email" and password "12345678" exists
    When I go to signup page
    And I enter the signup user email "external > signup > email"
    And I enter the signup user password "12345678"
    And I enter the signup user confirm password "12345678"
    And I click on signup button
    Then I am redirected to Verify Email page
    When I wait for "30" seconds
    When I retrieve the verification code "external > signup > verification code" from my email account "external > signup > account id"
    And I enter the email verification code "external > signup > verification code"
    And I click on send verification code button
    Then I am redirected to All Quotes page
