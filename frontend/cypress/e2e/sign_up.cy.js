/* eslint-disable no-undef */
describe('Sign up ', () => {
    it('page can be opened', function () {
        cy.visit('http://localhost:3000/signUp');
        cy.contains('Sign up');
        cy.contains('Already have an account?');
        cy.contains('Log in');

        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="name"]').should('be.visible');
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="confirmPassword"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');

    });
});
