import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import contactReducer from './reducers/contactReducer';

import contactSaga from './sagas/contactSaga';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        contactReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(contactSaga);

    return store;
}