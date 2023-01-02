describe('Log in ', () => {
    before(() => {
        cy.request('POST', 'http://localhost:3000/api/testing/reset');
        cy.request('POST', 'http://localhost:3000/api/testing/createDefaultUser');
    });
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });
    it('page can be opened', () => { });
    it('local storage is empty if user is not logged in', () => {
        cy.getLocalStorage('user').should('not.exist');
    });
    it('contains a link to the sign up page', () => {
        cy.contains('Log in');
        cy.contains('Don\'t have an account?');
        cy.contains('Sign up');
        cy.get('a[href="/signUp"]').should('be.visible');
    });
    it('contains required fields', () => {
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });
    it('can be submitted and works', () => {
        cy.get('input[name="username"]').type('test');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/');
        cy.getLocalStorage('user').should('exist');
    });
    afterEach(() => {
        cy.saveLocalStorage();
    });
});
