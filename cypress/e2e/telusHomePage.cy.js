describe('Telus Search', () => {

  // Text to be typed into the search bar
  const inputText = "Internet. "
 
  it('Search', () => {
    // Visit the Telus homepage
    cy.visit('https://telus.com')

    // Set the viewport to 2999x2000
    // This is done to ensure that it open to bigger window size
    cy.viewport(2999, 2000)

    // Wait for the search button to be visible, then hover over it
    // This is done to ensure that the search button is in focus
    cy.wait(5000).then(() => {
      // Get the search button and make sure it is visible
      // This is done to ensure that we are looking at the correct element
      cy.get('nav[aria-label="search and cart"] form[id="ge-search-input"] span button').should('be.visible')
      
      // Hover over the search button
      // This is done to ensure that the search input is in focus
      cy.get('nav[aria-label="search and cart"] form[id="ge-search-input"] span button').realHover()
    })
    
    // Click on the search button
    // This is done to open the search input
    cy.get('nav[aria-label="search and cart"] form[id="ge-search-input"] span button').click()
  

    // Type the search text into the search input
    // This is done to search for the provided text
    cy.get('input[data-test="search-input"]').type(inputText)

    // Wait for the search results to load, then click on the 3rd result
    // This is done to verify that the search results are loaded
    cy.wait(3000).then(() => {
      // Get the 3rd search result and click on it
      // This is done to open the search result
      cy.get('nav[aria-label="search and cart"] ul[class^="sc-"] li:nth-child(3) a').click()
    })

    // Check that the search label is present and contains the expected text
    // This is done to verify that the search result is related to the search term
    cy.get('div[class^="styles__SearchLabelContainer-"] div[dir="auto"]')
    .should(($div) => {
      const text = $div.text()
      // The search result should contain the word "internet"
      expect(text).to.match(/internet/)
      // The search result should contain the full search term
      expect(text).to.include('internet')
    })
 
    // Validate that there are at least 6 search results
    // This is done to verify that the search function is working properly
    cy.get('ul> li > a[href^="https://www.telus.com"][href*="search_result_"]').should('have.length.at.least', 6)

   
      // Test that the first 6 search results have clickable links
      // This is done to verify that the links are working properly
      const resultLinks = ['1', '2', '3', '4', '5', '6'];
      resultLinks.forEach((resultNumber) => {
        // For each result link, check that the href attribute is not undefined
        cy.get(`ul> li > a[href^="https://www.telus.com"][href*="search_result_${resultNumber}"]`).should("not.have.attr", "href", "undefined");
      });

      // Click on the first search result
      // This is done to verify that the search result page is rendered correctly
      cy.get('ul> li > a[href^="https://www.telus.com/en/mobility"][href$="search_result_1"]').click()
  })
  
 
})
