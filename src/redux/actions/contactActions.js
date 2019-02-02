export const SET_CONTACTS = "SET_CONTACTS";
export const CONTACTS_REQUEST_ERROR = "CONTACTS_REQUEST_ERROR";
export const CONTACTS_REQUEST_SUCCESS = "CONTACTS_REQUEST_SUCCESS";
export const SHOW_DELETE_CONTACT_CONFIRM = "SHOW_DELETE_CONTACT_CONFIRM";
export const HIDE_DELETE_CONTACT_CONFIRM = "HIDE_DELETE_CONTACT_CONFIRM";
export const SHOW_ADD_NEW_CONTACT_MODAL = "SHOW_ADD_NEW_CONTACT_MODAL";
export const HIDE_ADD_NEW_CONTACT_MODAL = "HIDE_ADD_NEW_CONTACT_MODAL";

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

export function showDeleteContactConfirm(contact) {
    return {
        type: SHOW_DELETE_CONTACT_CONFIRM,
        payload: contact
    };
}

export function hideDeleteContactConfirm(contact) {
    return {
        type: HIDE_DELETE_CONTACT_CONFIRM
    };
}

export function showAddNewContactModal() {
    return {
        type: SHOW_ADD_NEW_CONTACT_MODAL
    };
}

export function hideAddNewContactModal() {
    return {
        type: HIDE_ADD_NEW_CONTACT_MODAL
    };
}