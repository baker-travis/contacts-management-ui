import {
    SET_CONTACTS,
    CONTACTS_REQUEST_ERROR,
    CONTACTS_REQUEST_SUCCESS
} from '../actions/contactActions';

const defaultState = {
    contacts: [],
    error: ''
};

export default function(state = {...defaultState}, action) {
    switch (action.type) {
        case SET_CONTACTS:
            return {...state, contacts: action.payload}
        case CONTACTS_REQUEST_SUCCESS:
            return {...state, error: ''};
        case CONTACTS_REQUEST_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}