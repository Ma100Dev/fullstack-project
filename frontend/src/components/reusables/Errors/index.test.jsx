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
        const errors = [];
        for (let i = 0; i < 10; i++) {
            errors.push({
                id: i.toString(),
                msg: `Error ${i}`,
            });
        }
        renderWithProviders({
            ui: <Errors />,
            state: {
                errors,
            },
        });
        errors.forEach((error) => {
            expect(screen.getByText(error.msg)).toBeInTheDocument();
        });
    });
});
