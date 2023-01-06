import { renderWithRouter } from '@utils/test-utils';
import { test, expect, jest } from '@jest/globals';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('MenuItem links to the correct path', () => {
    renderWithRouter({ ui: <MenuItem text="Home" link="/" /> });
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');

    cleanup();

    renderWithRouter({ ui: <MenuItem text="Home" link="/home" /> });
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/home');
});

test('MenuItem calls onClick when clicked', async () => {
    const onClick = jest.fn();
    renderWithRouter({ ui: <MenuItem text="Home" isButton onClick={onClick} /> });
    const user = userEvent.setup();
    await user.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('MenuItem does not call onClick when clicked if isButton is false', async () => {
    const onClick = jest.fn();
    renderWithRouter({ ui: <MenuItem text="Home" link="/" onClick={onClick} /> });
    const user = userEvent.setup();
    await user.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledTimes(0);
});
