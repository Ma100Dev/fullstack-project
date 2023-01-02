describe('Profile', () => {
    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.visit('http://localhost:3000/profile');
    });
    it('page can be opened', () => { });
    it('has loaded the user data', () => {
        cy.getLocalStorage('user').should('exist');
    });
    it('displays the user data', () => {
        cy.contains('Profile');
        cy.contains('Name');
        cy.contains('Username');
        cy.contains('Email');

        cy.contains('Test User');
        cy.contains('test');
        cy.contains('test@example.com');
    });
    after(() => {
        cy.clearLocalStorageSnapshot();
    });
});
