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
