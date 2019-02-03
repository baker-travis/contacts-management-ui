import React from 'react';

import {connect} from 'react-redux';

import Button from 'react-bootstrap/Button';

import ContactsList from './Components/ContactsList';
import Header from './Components/Header';
import ContactModal from './Components/ContactModal';
import DeleteContactModal from './Components/DeleteContactModal';

import {
    hideAddNewContactModal,
    hideDeleteContactConfirm,
    showAddNewContactModal
} from './redux/actions/contactActions';

import {DELETE_CONTACT, ADD_CONTACT} from './redux/sagas/contactSaga';

import './App.css';

function App({
    showAddNewContactModal,
    showAddContactModal,
    hideAddContactModal,
    addContact,
    showDeleteContactModal,
    contactToDelete,
    hideDeleteContactModal,
    deleteContact
}) {
    return (
        <div>
            <header>
                <Header />
            </header>
            <div className="mainContent">
                <h1 className="pageTitle">Maine Doe's Contacts</h1>
                <Button onClick={showAddNewContactModal} className="addContactButton" variant="outline-success">Add Contact</Button>
                <ContactsList />
            </div>
            <ContactModal
                show={showAddContactModal}
                close={hideAddContactModal}
                onSave={addContact}
            />
            <DeleteContactModal
                show={showDeleteContactModal}
                contact={contactToDelete}
                close={hideDeleteContactModal}
                onDelete={deleteContact}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        showAddContactModal: state.showAddNewContactModal,
        showDeleteContactModal: state.showDeleteContactConfirm,
        contactToDelete: state.contactToDelete
    };
}

function mapDisptachToProps(dispatch) {
    return {
        showAddNewContactModal: () => dispatch(showAddNewContactModal()),
        hideAddContactModal: () => dispatch(hideAddNewContactModal()),
        hideDeleteContactModal: () => dispatch(hideDeleteContactConfirm()),
        deleteContact: (uuid) => dispatch({type: DELETE_CONTACT, payload: uuid}),
        addContact: (contact) => dispatch({type: ADD_CONTACT, payload: contact})
    };
}

export default connect(mapStateToProps, mapDisptachToProps)(App);
