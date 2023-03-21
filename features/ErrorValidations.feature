Feature: Ecommerce validations
    @Validation
    Scenario: Placing the order
        Given a login to Ecommerce2 app with "anshika@gmail.com" and "Iamking@000"
        Then Verify Error message is displayed


