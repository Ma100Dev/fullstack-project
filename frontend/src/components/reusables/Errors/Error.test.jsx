import { renderWithProviders } from '@utils/test-utils';
import { test, expect, jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import Error from './Error';

test('Error renders', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => null;
    renderWithProviders({
        ui: <Error
            time={Number.MAX_VALUE}
            error={{
                id: 'test',
                title: 'Test Error',
                msg: 'This is a test error',
            }}
        />
    });
    expect(await screen.findByTestId('error')).not.toBeNull();
});

test('Error renders with no props but does give a warning', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => null;
    jest.spyOn(console, 'warn').mockImplementation();
    renderWithProviders({
        ui: <Error />
    });
    expect(await screen.findByTestId('error')).not.toBeNull();
    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalled();
});

test('Error renders with correct text', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => null;
    renderWithProviders({
        ui: <Error
            time={Number.MAX_VALUE}
            error={{
                id: 'test',
                title: 'Test Error',
                msg: 'This is a test error',
            }}
        />
    });
    expect(await screen.findByTestId('error')).not.toBeNull();
    expect(await screen.findByText('Test Error')).not.toBeNull();
    expect(await screen.findByText('This is a test error')).not.toBeNull();
});

test('Error scrolls into view', async () => {
    const scrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
    renderWithProviders({
        ui: <Error
            time={Number.MAX_VALUE}
            error={{
                id: 'test',
                title: 'Test Error',
                msg: 'This is a test error',
            }}
        />
    });
    expect(await screen.findByTestId('error')).not.toBeNull();
    expect(scrollIntoView).toHaveBeenCalled();
});

test('Error calls for removal after time has passed', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => null;
    const error = {
        id: 'test',
        title: 'Test Error',
        msg: 'This is a test error',
    };
    const { store } = renderWithProviders({
        ui: <Error
            time={10}
            error={error}
        />,
        state: {
            errors: [error],
        },
    });
    expect(await screen.findByTestId('error')).not.toBeNull();
    expect(store.getState().errors).toHaveLength(1);
    expect(await screen.findByText('Test Error')).not.toBeNull();
    expect(await screen.findByText('This is a test error')).not.toBeNull();
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(store.getState().errors).toHaveLength(0);
});
