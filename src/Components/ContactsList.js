import React, {Component} from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';

import ContactsListRow from './ContactsListRow';

import {GET_CONTACTS} from '../redux/sagas/contactSaga';

import './ContactsList.css';

// const data = [
//     {
//         uuid: 1,
//         firstName: 'Travis',
//         lastName: 'Baker',
//         street: '1824 Megan Creek Dr.',
//         city: 'Little Elm',
//         state: 'TX',
//         zip: '75068',
//         phone: '8325175400',
//         email: 'baker.travis.w@gmail.com'
//     },
//     {
//         uuid: 2,
//         firstName: 'Travis',
//         lastName: 'Baker',
//         street: '1824 Megan Creek Dr.',
//         city: 'Little Elm',
//         state: 'TX',
//         zip: '75068',
//         phone: '8325175400',
//         email: 'baker.travis.w@gmail.com'
//     },
//     {
//         uuid: 3,
//         firstName: 'Travis',
//         lastName: 'Baker',
//         street: '1824 Megan Creek Dr.',
//         city: 'Little Elm',
//         state: 'TX',
//         zip: '75068',
//         phone: '8325175400',
//         email: 'baker.travis.w@gmail.com'
//     }
// ]
class ContactsList extends Component {
    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        return (
            <Table hover responsive>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.contacts.map((contact) => {
                        return <ContactsListRow key={contact.uuid} {...contact} />;
                    })}
                </tbody>
            </Table>
        );
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.contacts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getContacts: () => dispatch({type: GET_CONTACTS})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
