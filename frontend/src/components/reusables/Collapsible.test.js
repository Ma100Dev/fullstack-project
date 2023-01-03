import { test, expect, jest } from '@jest/globals';
import { screen, render } from '@testing-library/react';
import Collapsible from './Collapsible';


test('empty Collapsible throws error', () => {
    const fakeLogger = jest.fn();
    jest.spyOn(global.console, 'error').mockImplementation((params) => fakeLogger(params));

    render(<Collapsible />);
    expect(document.querySelector('.collapsible')).not.toBeNull();
    expect(fakeLogger).toHaveBeenCalledTimes(2); // Both "title" and "children" are missing
});

test('Collapsible without title throws error', () => {
    const fakeLogger = jest.fn();
    jest.spyOn(global.console, 'error').mockImplementation((params) => fakeLogger(params));
    render(
        <Collapsible>
            <div>Content</div>
        </Collapsible>);
    expect(document.querySelector('.collapsible')).not.toBeNull();
    expect(fakeLogger).toHaveBeenCalledTimes(1); // "title" is missing
});

test('Collapsible without children throws error', () => {
    const fakeLogger = jest.fn();
    jest.spyOn(global.console, 'error').mockImplementation((params) => fakeLogger(params));
     
    render(<Collapsible title="Title" />);
    expect(fakeLogger).toHaveBeenCalledTimes(1); // "children" is missing
});

test('Collapsible with title and children renders', () => {
    render(
        <Collapsible title="Title">
            <div>Content</div>
        </Collapsible>);
    expect(document.querySelector('.collapsible')).not.toBeNull();
    expect(screen.getByText('Title')).not.toBeNull();

    expect(screen.queryByText('Content')).toBeNull();
});
    

