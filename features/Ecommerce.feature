Feature: Ecommerce validations

    Scenario: Placing the order
        Given a login to Ecommerce app with "anshika@gmail.com" and "Iamking@000"
        When Add "zara coat 3" to cart
        Then Verify "zara coat 3" is displayed in the cart

        When Enter valid details and place the order
        Then Verify order is present in order history

