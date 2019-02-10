import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';
import sortBy from 'lodash.sortby';

import ContactsListRow from './ContactsListRow';

import {GET_CONTACTS} from '../redux/sagas/contactSaga';

import {showDeleteContactConfirm} from '../redux/actions/contactActions';

function ContactsList({contacts, getContacts, deleteContact}) {
    useEffect(() => {
        getContacts();
    }, []);
    const sortedList = sortContactsList(contacts);
        
    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Street Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sortedList.map((contact) => {
                    return (
                        <ContactsListRow
                            key={contact.uuid}
                            onDelete={deleteContact}
                            {...contact}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
}

function sortContactsList(contactsList) {
    return sortBy(contactsList, ['lastName', 'firstName', 'state', 'city', 'zip', 'street', 'email']);
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getContacts: () => dispatch({type: GET_CONTACTS}),
        deleteContact: (contact) => dispatch(showDeleteContactConfirm(contact))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
