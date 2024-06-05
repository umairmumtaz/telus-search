describe('Telus Search', () => {

  // Text to be typed into the search bar
  const inputText = "Internet. "
 
  it('Search', () => {
    // Visit the page
    cy.visit('https://telus.com')

    // Set the viewport to 2999x2000
    cy.viewport(2999, 2000)

    // Simulate a user clicking on the language toggler button
    cy.wait(3000).then(() => {
    cy.get('button[data-test="languageToggler"]').realMouseDown()
    cy.get('button[data-test="languageToggler"]').realHover()
    })

    // Hover over the search button
    cy.get('nav[aria-label="search and cart"] form[id="ge-search-input"] span button').realHover()

    // Wait for the search button to be visible, then click it
    cy.wait(3000).then(() => {
      cy.get('nav[aria-label="search and cart"] form[id="ge-search-input"] span button')
      .should('be.visible').click()
    })

    // Type the search text into the search input
    cy.get('input[data-test="search-input"]')
    .type(inputText)
    

    // Wait for the search results to load, then click on the 3rd result
    cy.wait(3000).then(() => {
      cy.get('nav[aria-label="search and cart"] ul[class^="sc-"] li:nth-child(3) a').click()
    })

    // Check that the search label is present and contains the expected text
    cy.get('div[class^="styles__SearchLabelContainer-"] div[dir="auto"]')
    .should(($div) => {
      const text = $div.text()
      expect(text).to.match(/internet/)
      expect(text).to.include('internet')
    })

    // Validate that there are at least 6 search results
    cy.get('ul> li > a[href^="https://www.telus.com"][href*="search_result_"]').should('have.length.at.least', 6)
    
    // Click on the first search result
    cy.get('ul> li > a[href^="https://www.telus.com/en/mobility"][href$="search_result_1"]').click()
  
  })

   
   
})
