Feature: Tariff details

    Feature Description:
    # AS A Verivox user
    # I WANT TO use the DSL calculator and tariff search pages
    # SO THAT I can select the best available internet tariff for my needs

    Background: Launch Verivox homepage
        Given I can open "https://www.verivox.de/"
        And I navigate to the DSL calculator page
        * I select "Internet+Telefon" and enter "030" for my area code 
        * I select the "100 Mbit/s" bandwidth option
        When I click the `Jetzt vergleichen` button

   Scenario: Verify the DSL calculator
        Then I should see a page that lists the available tariffs for my selection
        And at least "5" internet tariffs are displayed
        And the displayed tariffs provide at least "100 Mbit/s" download speed

    Scenario: Load multiple tariff result pages
        And I display the tariff Result List page
        * I should see the total number of available tariffs listed in the Ermittelte Tarife section
        * I scroll to the end of the Result List page
        * I should see only the first 20 tariffs displayed
        Then I click on the button labeled 20 weitere Tarife laden
        And I should see the next 20 tariffs displayed
        * I can continue to load any additional tariffs until all tariffs have been displayed

# # Verify that the weitere Tarife laden button is no longer displayed when all the tariffs are visible
# # the total number of tariffs displayed matches the total listed in the Ermittelte Tarife section
# # Bonus points +++ 
# # Verify that the final weitere Tarife laden button displays the expected number of tariffs remaining

#     Scenario: Verify offer details for a selected tariff
#         And I display the tariff result list page # See screenshot 2
#         WHEN I click on any Zum Angebot button to select a tariff offer # Zum Angebot = to the offer
#         THEN I should see the corresponding offer page for the selected tariff

#         # Verify that 
#         # the offer page displays both In 5 Minuten online wechseln buttons
#         # the expected page contents and tariff details for your selected tariff
#             # see the outlined page contents in screenshot 5 below
#         # Bonus points +++ 
#         # Verify the offer pages for 2 different tariffs with a parameterized test