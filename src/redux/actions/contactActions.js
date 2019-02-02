export const SET_CONTACTS = "SET_CONTACTS";
export const CONTACTS_REQUEST_ERROR = "CONTACTS_REQUEST_ERROR";
export const CONTACTS_REQUEST_SUCCESS = "CONTACTS_REQUEST_SUCCESS";

export function setContacts(contacts) {
    return {
        type: SET_CONTACTS,
        payload: contacts
    };
}

export function contactsRequestError(message) {
    return {
        type: CONTACTS_REQUEST_ERROR,
        payload: message
    };
}

export function contactsRequestSuccess() {
    return {
        type: CONTACTS_REQUEST_SUCCESS
    }
}