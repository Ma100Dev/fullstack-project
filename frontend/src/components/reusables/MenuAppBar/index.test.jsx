import { renderWithProvidersAndRouter } from '@utils/test-utils';
import { test, expect, describe } from '@jest/globals';
import { screen } from '@testing-library/react';
import MenuAppBar from '.';
const component = <MenuAppBar />;

describe('MenuAppBar', () => {
    test('renders MenuAppBar', () => {
        renderWithProvidersAndRouter({ ui: component });
    });

    test('renders correct options when logged out', () => {
        renderWithProvidersAndRouter({ ui: component });
        expect(document.querySelector('.menu-app-bar')).not.toBeNull();
        expect(screen.getByText('Home')).not.toBeNull();
        expect(screen.getByText('Rent')).not.toBeNull();
        expect(screen.getByText('Log in')).not.toBeNull();
        expect(screen.getByText('Sign up')).not.toBeNull();
    });

    test('renders correct options when logged in', () => {
        const state = {
            user: {
                token: 'some-token',
                id: 'test-id',
            },
            rentals: [],
            conversations: [],
            errors: []
        };
        renderWithProvidersAndRouter({ ui: component, state });
        expect(document.querySelector('.menu-app-bar')).not.toBeNull();
        expect(screen.getByText('Home')).not.toBeNull();
        expect(screen.getByText('Rent')).not.toBeNull();
        expect(screen.getByText('List a new property')).not.toBeNull();
        expect(screen.getByText('Messages')).not.toBeNull();
        expect(screen.getByText('Profile')).not.toBeNull();
        expect(screen.getByText('Log out')).not.toBeNull();

        expect(screen.queryByText('Log in')).toBeNull();
        expect(screen.queryByText('Sign up')).toBeNull();
    });

});
