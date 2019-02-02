import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import ContactsListRow from './ContactsListRow';

import './ContactsList.css';

const data = [
    {
        uuid: 1,
        firstName: 'Travis',
        lastName: 'Baker',
        street: '1824 Megan Creek Dr.',
        city: 'Little Elm',
        state: 'TX',
        zip: '75068',
        phone: '8325175400',
        email: 'baker.travis.w@gmail.com'
    },
    {
        uuid: 2,
        firstName: 'Travis',
        lastName: 'Baker',
        street: '1824 Megan Creek Dr.',
        city: 'Little Elm',
        state: 'TX',
        zip: '75068',
        phone: '8325175400',
        email: 'baker.travis.w@gmail.com'
    },
    {
        uuid: 3,
        firstName: 'Travis',
        lastName: 'Baker',
        street: '1824 Megan Creek Dr.',
        city: 'Little Elm',
        state: 'TX',
        zip: '75068',
        phone: '8325175400',
        email: 'baker.travis.w@gmail.com'
    }
]
export default class ContactsList extends Component {
    render() {
        return (
            <Table hover responsive>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Street Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th></th>
                </thead>
                <tbody>
                    {data.map((contact) => {
                        return <ContactsListRow key={contact.uuid} {...contact} />;
                    })}
                </tbody>
            </Table>
        );
    }
}