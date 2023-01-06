import { test, expect, jest } from '@jest/globals';
import { screen, render } from '@testing-library/react';
import PageSelector from './PageSelector';
import userEvent from '@testing-library/user-event';

test('renders empty PageSelector', () => {
    render(<PageSelector />);
    const component = document.querySelector('.page-selector');
    expect(component).not.toBeNull();
    expect(component.childElementCount).toBe(0);
});

test('renders PageSelector with 3 pages', () => {
    render(<PageSelector pageCount={3} onChange={() => null} />);
    const component = document.querySelector('.page-selector');
    expect(component).not.toBeNull();
    expect(component.childElementCount).toBe(3);
    expect(screen.getByRole('button', { name: '1' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '2' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '3' })).not.toBeNull();
});

test('renders PageSelector with 50 pages', () => {
    render(<PageSelector pageCount={50} onChange={() => null} />);
    const component = document.querySelector('.page-selector');
    expect(component).not.toBeNull();
    expect(component.childElementCount).toBe(50);
    for (let i = 1; i <= 50; i++) {
        expect(screen.getByRole('button', { name: i.toString() })).not.toBeNull();
    }
});

test('calls onChange when page is clicked', async () => {
    const onChange = jest.fn();
    render(<PageSelector pageCount={3} onChange={onChange} />);
    const component = document.querySelector('.page-selector');
    expect(component).not.toBeNull();
    expect(component.childElementCount).toBe(3);
    expect(screen.getByRole('button', { name: '1' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '2' })).not.toBeNull();
    expect(screen.getByRole('button', { name: '3' })).not.toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    
    const user = userEvent.setup();
    let button = screen.getByRole('button', { name: '2' });
    await user.click(button);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);

    button = screen.getByRole('button', { name: '2' });
    await user.click(button);
    expect(onChange).toHaveBeenCalledTimes(1);

    button = screen.getByRole('button', { name: '1' });
    await user.click(button);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(1);
});
