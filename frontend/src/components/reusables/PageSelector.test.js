import { test, expect } from '@jest/globals';
import { screen, render } from '@testing-library/react';
import PageSelector from './PageSelector';

test('renders PageSelector', () => {
    render(<PageSelector />);
    expect(document.querySelector('.page-selector')).not.toBeNull();
});
