Feature: Ecommerce validations
    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 app with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username          | password    |
            | anshika@gmail.com | Iamking@000 |
            | test@gmail.com    | test123     |


