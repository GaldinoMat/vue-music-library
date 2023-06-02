describe('Audio component sanity test', () => {
  it('should click, visit a song page and play the selected song', () => {
    cy.visit('/')
    cy.get('.composition-name:first').click()
    cy.get('#play-btn').click()
    cy.wait(5000)
    cy.get('#play-btn').click()
  })
})
