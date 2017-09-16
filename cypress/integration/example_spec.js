// var casual = require('casual');

describe('Smoke Test', function() {
  it('should load landing page', function() {
    cy.visit('http://localhost:4000');
    cy.title().should('include', 'Home — Conduit');
    cy.screenshot();
    cy.get('a[ui-sref="app.register"]')
      .click();
    // var user = {
    //   username: casual.username,
    //   email: casual.email,
    //   password: casual.password,
    // };
    // cy.get('input[placeholder="Username"]')
    //   .type(user.username);
    // cy.get('input[placeholder="Email"]')
    //   .type(user.email);
    // cy.get('input[placeholder="Password"]')
    //   .type(casual.password);
    // cy.get('button[type="submit"]')
    //   .click();
  });
});
