import React, { Component } from 'react';

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

class App extends Component {
    render() {
        return (
        <div>
            <header>
                <Header />
            </header>
            <div className="mainContent">
                <h1 className="pageTitle">Maine Doe's Contacts</h1>
                <Button onClick={this.props.showAddNewContactModal} className="addContactButton" variant="outline-success">Add Contact</Button>
                <ContactsList />
            </div>
            <ContactModal
                show={this.props.showAddContactModal}
                close={this.props.hideAddContactModal}
                onSave={this.props.addContact}
            />
            <DeleteContactModal
                show={this.props.showDeleteContactModal}
                contact={this.props.contactToDelete}
                close={this.props.hideDeleteContactModal}
                onDelete={this.props.deleteContact}
            />
        </div>
        );
    }
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
