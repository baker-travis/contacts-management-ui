import {put, takeLatest, all, call} from 'redux-saga/effects';
import axios from 'axios';

import {
    setContacts,
    contactsRequestSuccess,
    contactsRequestError
} from '../actions/contactActions';

export const GET_CONTACTS = "GET_CONTACTS";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const ADD_CONTACT = "ADD_CONTACT";

const ENDPOINTS = {
    GET_CONTACTS: 'http://localhost:8080/api/v1/contacts',
    NEW_CONTACT: 'http://localhost:8080/api/v1/contacts',
    DELETE_CONTACT: (uuid) => `http://localhost:8080/api/v1/contacts/${uuid}`
};

// Our worker Saga: will perform the async increment task
function* getContacts() {
    try {
        const response = yield call(fetchContacts);
        yield put(setContacts(response.data));
        yield put(contactsRequestSuccess());
    } catch(error) {
        yield put(contactsRequestError('Unable to get contacts at this time. Please try again later.'));
    }
}

function fetchContacts() {
    return axios.get(ENDPOINTS.GET_CONTACTS);
}

function* deleteContact(uuid) {
    try {
        yield call(() => deleteContactRequest(uuid));
        yield put(contactsRequestSuccess);
        // Fetch all contacts after deleting
        yield put({type: GET_CONTACTS});
    } catch(error) {
        let message;
        switch (error.status) {
            case 404:
                message = "Unable to delete contact. Contact is already deleted.";
                break;
            default:
                message = "Your request to delete a contact has failed. Please try again later.";
        }

        yield put(contactsRequestError(message));
    }
}

function deleteContactRequest(uuid) {
    return axios.delete(ENDPOINTS.DELETE_CONTACT(uuid));
}

function* addContact(contact) {
    try {
        yield call(() => addContactRequest(contact));
        yield put(contactsRequestSuccess);
        // Fetch all contacts after adding a new one
        yield put({type: GET_CONTACTS});
    } catch(error) {
        yield put(contactsRequestError("Unable to create a new contact at this time. Please try again later."));
    }
}

function addContactRequest(contact) {
    return axios.post(ENDPOINTS.NEW_CONTACT, contact);
}

export function* watchGetContacts() {
    yield takeLatest(GET_CONTACTS, getContacts);
}

export function* watchDeleteContacts(uuid) {
    yield takeLatest(DELETE_CONTACT, () => deleteContact(uuid));
}

export function* watchAddContacts(contact) {
    yield takeLatest(ADD_CONTACT, () => addContact(contact));
}

export default function* rootSaga() {
    yield all([
        watchGetContacts(),
        watchDeleteContacts(),
        watchAddContacts()
    ]);
}