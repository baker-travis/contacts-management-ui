import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types';

export default function ContactsListRow({
    onDelete,
    ...contact
}) {

    return (
        <tr>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.street}</td>
            <td>{contact.city}</td>
            <td>{contact.state}</td>
            <td>{contact.zip}</td>
            <td><a href={`tel:${contact.phone}`}>{contact.phone}</a></td>
            <td><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
            <td>
                <ButtonToolbar>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(contact)}>
                        <span className="glyphicon glyphicon-trash">Delete</span>
                    </Button>
                </ButtonToolbar>
            </td>
        </tr>
    );
}

ContactsListRow.propTypes = {
    uuid: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
}