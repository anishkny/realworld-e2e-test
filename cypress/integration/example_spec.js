describe('Smoke Test', function() {
  it('should load landing page', function() {
    cy.visit('http://localhost:4000');
    cy.title().should('include', 'Home — Conduit');
    cy.screenshot();
  });
});
