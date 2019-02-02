import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import contactReducer from './reducers/contactReducer';

import contactSaga from './sagas/contactSaga';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        contactReducer,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(contactSaga);

    return store;
}