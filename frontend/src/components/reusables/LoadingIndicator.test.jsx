import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import LoadingIndicator from './LoadingIndicator';

// There honestly isn't much to test here, but I'm including this for completeness
test('LoadingIndicator renders', async () => {
    render(<LoadingIndicator />);
    expect(await screen.findByTestId('loading')).not.toBeNull();
});
