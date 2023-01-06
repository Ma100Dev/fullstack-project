import { renderWithRouter } from '@utils/test-utils';
import { test, expect, jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import MenuItem from './MenuItem';

test('MenuItem renders', () => {
    renderWithRouter({ ui: <MenuItem text="Home" link="/" /> });
    expect(screen.getByText('Home')).not.toBeNull();
});

test('MenuItem renders with isButton', () => {
    renderWithRouter({ ui: <MenuItem text="Home" isButton onClick={() => { }} /> });
    expect(screen.getByText('Home')).not.toBeNull();
});

test('MenuItem errors when isButton is false and link is not a string', () => {
    const errors = [];
    jest.spyOn(console, 'error').mockImplementation((params) => errors.push(params));
    renderWithRouter({ ui: <MenuItem text="Home" link={1} /> });
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalled();
    expect(errors).toEqual(['Warning: Failed %s type: %s%s']);
});
