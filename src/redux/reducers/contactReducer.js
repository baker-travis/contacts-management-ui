import {
    SET_CONTACTS,
    CONTACTS_REQUEST_ERROR,
    CONTACTS_REQUEST_SUCCESS,
    SHOW_ADD_NEW_CONTACT_MODAL,
    SHOW_DELETE_CONTACT_CONFIRM,
    HIDE_ADD_NEW_CONTACT_MODAL,
    HIDE_DELETE_CONTACT_CONFIRM
} from '../actions/contactActions';

const defaultState = {
    contacts: [],
    error: '',
    showAddNewContactModal: false,
    showDeleteContactConfirm: false,
    contactToDelete: null
};

export default function(state = {...defaultState}, action) {
    switch (action.type) {
        case SET_CONTACTS:
            return {...state, contacts: action.payload}
        case CONTACTS_REQUEST_SUCCESS:
            return {...state, error: ''};
        case CONTACTS_REQUEST_ERROR:
            return {...state, error: action.payload};
        case SHOW_ADD_NEW_CONTACT_MODAL:
            return {...state, showAddNewContactModal: true};
        case HIDE_ADD_NEW_CONTACT_MODAL:
            return {...state, showAddNewContactModal: false}
        case SHOW_DELETE_CONTACT_CONFIRM:
            return {...state, showDeleteContactConfirm: true, contactToDelete: action.payload};
        case HIDE_DELETE_CONTACT_CONFIRM:
            return {...state, showDeleteContactConfirm: false};
        default:
            return state;
    }
}