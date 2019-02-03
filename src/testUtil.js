import React from 'react';
import {render} from 'react-testing-library';
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore';

// From Kent C Dodds: https://github.com/kentcdodds/react-testing-library/blob/master/examples/__tests__/react-redux.js
export function renderWithRedux(component,
    {initialState, store = configureStore()} = {},
    ) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store
    }
}