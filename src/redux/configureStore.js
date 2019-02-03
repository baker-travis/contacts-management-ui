import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import contactReducer from './reducers/contactReducer';

import contactSaga from './sagas/contactSaga';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    // Needed to make redux dev tools work.
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        contactReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(contactSaga);

    return store;
}