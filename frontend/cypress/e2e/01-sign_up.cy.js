describe('Sign up ', () => {
    before(() => {
        cy.request('POST', 'http://localhost:3000/api/testing/reset');
    });
    beforeEach(() => {
        cy.visit('http://localhost:3000/signUp');
    });
    it('page can be opened', () => { });
    it('local storage is empty if user is not logged in', () => {
        cy.getLocalStorage('user').should('not.exist');
    });
    it('contains a link to the login page', () => {
        cy.contains('Sign up');
        cy.contains('Already have an account?');
        cy.contains('Log in');
        cy.get('a[href="/login"]').should('be.visible');
    });
    it('contains required fields', () => {
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="name"]').should('be.visible');
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="confirmPassword"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });
    it('can be submitted and works', () => {
        cy.get('input[name="email"]').type('valid.email@example.com');
        cy.get('input[name="name"]').type('Valid Name');
        cy.get('input[name="username"]').type('validusername');
        cy.get('input[name="password"]').type('validpassword');
        cy.get('input[name="confirmPassword"]').clear().type('validpassword');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/');
        cy.getLocalStorage('user').should('exist');
    });
});
