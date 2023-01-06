import { test, expect, jest } from '@jest/globals';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Collapsible from './Collapsible';


test('empty Collapsible throws error', () => {
    const fakeLogger = jest.fn();
    jest.spyOn(global.console, 'error').mockImplementation((params) => fakeLogger(params));

    render(<Collapsible />);
    expect(document.querySelector('.collapsible')).not.toBeNull();
    expect(fakeLogger).toHaveBeenCalledTimes(2); // Both "title" and "children" are missing
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

test('Collapsible with title and children renders, opens and closes', async () => {
    render(
        <Collapsible title="Title">
            <div>Content</div>
        </Collapsible>);
    expect(document.querySelector('.collapsible')).not.toBeNull();
    expect(screen.getByText('Title')).not.toBeNull();

    expect(screen.queryByText('Content')).toBeNull();
    const user = userEvent.setup();
    await user.click(screen.getByText('Title'));
    expect(screen.getByText('Content')).not.toBeNull();
    await user.click(screen.getByText('Title'));
    expect(screen.queryByText('Content')).toBeNull();
});
