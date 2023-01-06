import { test, expect, jest } from '@jest/globals';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormikTextField from './FormikTextField';

test('FormikTextField renders', () => {
    render(<FormikTextField label="name" errors={{}} handleChange={() => null} handleBlur={() => null} values={{}} type="text" touched={{}} placeholder="Name" />);
    expect(screen.getByPlaceholderText('Name')).not.toBeNull();
});

test('FormikTextField renders with error', () => {
    render(<FormikTextField label="name" errors={{ name: 'Name is required' }} handleChange={() => null} handleBlur={() => null} values={{}} type="text" touched={{ name: true }} placeholder="Name" />);
    expect(screen.getByPlaceholderText('Name')).not.toBeNull();
    expect(screen.getByText('Name is required')).not.toBeNull();
});

test('FormikTextField renders with value', () => {
    render(<FormikTextField label="name" errors={{}} handleChange={() => null} handleBlur={() => null} values={{ name: 'John' }} type="text" touched={{}} placeholder="Name" />);
    expect(screen.getByPlaceholderText('Name')).not.toBeNull();
    expect(screen.getByDisplayValue('John')).not.toBeNull();
});

test('FormikTextField calls handleChange', async () => {
    const inputs = [];
    const name = [];
    const handleChange = jest.fn((event) => {
        inputs.push(event.target.value);
        name.push(event.target.name);
    });
    render(<FormikTextField label="name" errors={{}} handleChange={handleChange} handleBlur={() => null} values={{}} type="text" touched={{}} placeholder="Name" />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Name');
    await user.type(input, 'John');
    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(inputs).toEqual(['J', 'Jo', 'Joh', 'John']);
    expect(name).toEqual(['name', 'name', 'name', 'name']);
});

test('FormikTextField calls handleBlur', async () => {
    const handleBlur = jest.fn();
    render(<FormikTextField label="name" errors={{}} handleChange={() => null} handleBlur={handleBlur} values={{}} type="text" touched={{}} placeholder="Name" />);
    const input = screen.getByPlaceholderText('Name');
    const user = userEvent.setup();
    await user.click(input);
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleBlur.mock.calls[0][0].target.name).toBe('name');
});
