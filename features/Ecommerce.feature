Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce app with "anshika@gmail.com" and "Iamking@000"
        When Add "zara coat 3" to cart
        Then Verify "zara coat 3" is displayed in the cart


