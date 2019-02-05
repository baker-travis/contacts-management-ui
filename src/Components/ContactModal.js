import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import ContactModalField from './ContactModalField';
import {
    validEmail,
    validPhone,
    validZip,
    isEmpty
} from '../utility/util';

const RESET_STATE = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    errors: {},
    visited: {}
}

export default class ContactModal extends Component {
    constructor(props) {
        super(props);

        const contact = props.contact || {}

        this.state = {
            firstName: contact.firstName || '',
            lastName: contact.lastName || '',
            street: contact.street || '',
            city: contact.city || '',
            state: contact.state || '',
            zip: contact.zip || '',
            phone: contact.phone || '',
            email: contact.email || '',
            errors: {},
            visited: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        
        // if we have any errors, halt submission
        for (let key in errors) {
            if (errors[key]) {
                // set required fields as visited so that the errors show up
                this.setState({
                    visited: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                });
                return;
            }
        }
        
        const {
            firstName,
            lastName,
            street,
            city,
            state,
            zip,
            phone,
            email
        } = this.state;
        
        const contact = {
            firstName,
            lastName,
            street,
            city,
            state,
            zip,
            phone,
            email
        };
        this.props.onSave(contact);
        // clear out the form
        this.setState(RESET_STATE);
    }
    
    validate() {
        let {
            firstName,
            lastName,
            phone,
            email
        } = this.state;
        // get address validation errors
        let errors = this.validateAddress();
        errors.firstName = isEmpty(firstName) ? 'First name is required' : null;
        errors.lastName = isEmpty(lastName) ? 'Last name is required' : null;
        errors.email = validEmail(email) ? null : 'Enter a valid email';
        errors.phone = validPhone(phone) ? null : 'Enter a valid phone';
        this.setState({errors});

        return errors;
    }

    setFirstName = (e) => {
        const firstName = e.target.value;
        this.setState({firstName}, this.validate);
    }

    setLastName = (e) => {
        const lastName = e.target.value;
        this.setState({lastName}, this.validate);
    }
    
    setEmail = (e) => {
        const email = e.target.value;
        this.setState({email}, this.validate);
    }
    
    setPhone = (e) => {
        const phone = e.target.value;
        this.setState({phone}, this.validate);
    }
    
    setStreet = (e) => {
        const street = e.target.value;
        this.setState({street}, this.validateAddress);
    }
    
    setCity = (e) => {
        const city = e.target.value;
        this.setState({city}, this.validateAddress);
    }
    
    setStateName = (e) => {
        const state = e.target.value;
        this.setState({state}, this.validateAddress);
    }
    
    setZip = (e) => {
        const zip = e.target.value;
        this.setState({zip}, this.validateAddress);
    }

    validateAddress = () => {
        let {street, city, state, zip} = this.state;
        let hasAddressFields = !!(street || city || state || zip);
        let errors = {};

        if (hasAddressFields) {
            errors.street = isEmpty(street) ? 'Enter a valid address' : null;
            errors.city = isEmpty(city) ? 'Enter a valid city' : null;
            errors.state = isEmpty(state) ? 'Enter a valid state' : null;
            errors.zip = validZip(zip) ? null : 'Enter a valid 5 digit zip';
        }

        this.setState({
            visited: {
                ...this.state.visited,
                street: hasAddressFields,
                city: hasAddressFields,
                state: hasAddressFields,
                zip: hasAddressFields
            },
            errors: {
                ...this.state.errors,
                ...errors
            }
        });

        return errors;
    }

    setVisited = (fieldName) => {
        if (!this.state.visited[fieldName] && this.state[fieldName]) {
            this.setState({visited: {...this.state.visited, [fieldName]: true}});
        }
    }

    onClose = () => {
        // Clear out the form
        this.setState(RESET_STATE);
        this.props.close();
    }
 
    render() {
        let {contact, show} = this.props;
        return (
            <Modal size= "lg" show={show} onHide={this.onClose}>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {contact ? `Editing Info for ${this.state.firstName} ${this.state.lastName}` : 'New Contact'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Row>
                            <ContactModalField
                                as={Col}
                                controlId="firstName"
                                label="First Name"
                                value={this.state.firstName}
                                onChange={this.setFirstName}
                                onBlur={() => this.setVisited('firstName')}
                                visited={this.state.visited.firstName}
                                error={this.state.errors.firstName}
                            />

                            <ContactModalField
                                as={Col}
                                controlId="lastName"
                                label="Last Name"
                                value={this.state.lastName}
                                onChange={this.setLastName}
                                onBlur={() => this.setVisited('lastName')}
                                visited={this.state.visited.lastName}
                                error={this.state.errors.lastName}
                            />
                        </Form.Row>

                        <Form.Row>
                            <ContactModalField
                                as={Col}
                                controlId="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.setEmail}
                                onBlur={() => this.setVisited('email')}
                                visited={this.state.visited.email}
                                error={this.state.errors.email}
                                type="email"
                            />

                            <ContactModalField
                                as={Col}
                                controlId="phone"
                                label="Phone Number"
                                value={this.state.phone}
                                onChange={this.setPhone}
                                onBlur={() => this.setVisited('phone')}
                                visited={this.state.visited.phone}
                                error={this.state.errors.phone}
                                type="tel"
                            />
                        </Form.Row>

                        <ContactModalField
                            controlId="street"
                            label="Address"
                            value={this.state.street}
                            onChange={this.setStreet}
                            onBlur={this.validateAddress}
                            visited={this.state.visited.street}
                            error={this.state.errors.street}
                            placeholder="1234 Main St"
                        />

                        <Form.Row>
                            <ContactModalField
                                as={Col}
                                controlId="city"
                                label="City"
                                value={this.state.city}
                                onChange={this.setCity}
                                onBlur={this.validateAddress}
                                visited={this.state.visited.city}
                                error={this.state.errors.city}
                            />

                            <ContactModalField
                                as={Col}
                                controlId="state"
                                label="State"
                                value={this.state.state}
                                onChange={this.setStateName}
                                onBlur={this.validateAddress}
                                visited={this.state.visited.state}
                                error={this.state.errors.state}
                            />

                            <ContactModalField
                                as={Col}
                                controlId="zip"
                                label="Zip"
                                value={this.state.zip}
                                onChange={this.setZip}
                                onBlur={this.validateAddress}
                                visited={this.state.visited.zip}
                                error={this.state.errors.zip}
                            />
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.onSubmit} variant="success">Save</Button>
                        <Button onClick={this.onClose} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}
