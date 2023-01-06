import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import setupStore from '../store';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';

export const renderWithProviders = ({ui, state, renderOptions}) => {
    const store = setupStore(state || {});
    const Wrapper = ({ children }) => {
        return <Provider store={store}>{children}</Provider>;
    };
    Wrapper.propTypes = {
        children: PropTypes.node,
    };
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithRouter = ({ ui, renderOptions }) => {
    const Wrapper = ({ children }) => {
        return <MemoryRouter>{children}</MemoryRouter>;
    };
    Wrapper.propTypes = {
        children: PropTypes.node,
    };
    return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};


export const renderWithProvidersAndRouter = ({ ui, state, renderOptions }) => {
    const store = setupStore(state || {});
    const Wrapper = ({ children }) => {
        return (
            <Provider store={store}>
                <MemoryRouter>{children}</MemoryRouter>
            </Provider>
        );
    };
    Wrapper.propTypes = {
        children: PropTypes.node,
    };
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
