import { describe, test, expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@utils/test-utils';
import Errors from '.';

describe('Errors', () => {
    test('Error list without errors renders', async () => {
        renderWithProviders({
            ui: <Errors />,
        });
        expect(await screen.findByTestId('errors')).not.toBeNull();
    });

    test('Error list renders errors', async () => {
        window.HTMLElement.prototype.scrollIntoView = () => null;
        renderWithProviders({
            ui: <Errors />,
            state: {
                errors: [
                    {
                        id: '1',
                        message: 'Error 1',
                    },
                    {
                        id: '2',
                        message: 'Error 2',
                    },
                ],
            },
        });
        expect(await screen.findByText('Error 1')).not.toBeNull();
        expect(await screen.findByText('Error 2')).not.toBeNull();
    });
});
