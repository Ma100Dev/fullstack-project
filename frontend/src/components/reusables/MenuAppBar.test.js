import { renderWithProvidersAndRouter } from '@utils/test-utils';
import { test, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import MenuAppBar from './MenuAppBar';
const component = <MenuAppBar />;

test('renders MenuAppBar', () => {
    renderWithProvidersAndRouter({ ui: component });
});

test('renders correct options when logged out', () => {
    renderWithProvidersAndRouter({ ui: component});
    expect(document.querySelector('.menu-app-bar')).not.toBeNull();
    expect(screen.getByText('Home')).not.toBeNull();
    expect(screen.getByText('Rent')).not.toBeNull();
    expect(screen.getByText('Log in')).not.toBeNull();
    expect(screen.getByText('Sign up')).not.toBeNull();
});

test('renders correct options when logged in', () => {
    const state = {
        user: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYzYjNmN2YyMzI3ODllZTgyYjU3MDk1MSIsImlhdCI6MTY3Mjc0MTExMX0.ApwCY_MvtfDjQm11iYhyd3wS840oCz9hHZfs2emtahU',
            id: '63b3f7f232789ee82b570951'
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

