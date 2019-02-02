import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types';

import './ContactsListRow.css';

export default class ContactsListRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.street}</td>
                <td>{this.props.city}</td>
                <td>{this.props.state}</td>
                <td>{this.props.zip}</td>
                <td><a href={`tel:${this.props.phone}`}>{this.props.phone}</a></td>
                <td><a href={`mailto:${this.props.email}`}>{this.props.email}</a></td>
                <td>
                    <ButtonToolbar>
                        <Button variant="outline-danger" size="sm" onClick={() => this.props.onDelete(this.props.uuid)}>
                            <span className="glyphicon glyphicon-trash">Delete</span>
                        </Button>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
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