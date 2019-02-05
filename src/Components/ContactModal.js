import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

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
        errors.firstName = isEmpty(firstName) ? 'Name is required' : null;
        errors.lastName = isEmpty(lastName) ? 'Name is required' : null;
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
 
    render() {
        let {contact, close, show} = this.props;
        return (
            <Modal size= "lg" show={show} onHide={close}>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {contact ? `Editing Info for ${this.state.firstName} ${this.state.lastName}` : 'New Contact'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    value={this.state.firstName}
                                    onChange={this.setFirstName}
                                    onBlur={() => this.setVisited('firstName')}
                                    isInvalid={this.state.visited.firstName && this.state.errors.firstName}
                                    isValid={this.state.visited.firstName && !this.state.errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    value={this.state.lastName}
                                    onChange={this.setLastName}
                                    onBlur={() => this.setVisited('lastName')}
                                    isInvalid={this.state.visited.lastName && this.state.errors.lastName}
                                    isValid={this.state.visited.lastName && !this.state.errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.setEmail}
                                    onBlur={() => this.setVisited('email')}
                                    isInvalid={this.state.visited.email && this.state.errors.email}
                                    isValid={this.state.visited.email && !this.state.errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={this.state.phone}
                                    onChange={this.setPhone}
                                    onBlur={() => this.setVisited('phone')}
                                    isInvalid={this.state.visited.phone && this.state.errors.phone}
                                    isValid={this.state.visited.phone && !this.state.errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="street">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                placeholder="1234 Main St"
                                value={this.state.street}
                                onChange={this.setStreet}
                                onBlur={this.validateAddress}
                                isInvalid={this.state.visited.street && this.state.errors.street}
                                isValid={this.state.visited.street && !this.state.errors.street}
                            />
                            <Form.Control.Feedback type="invalid">
                                {this.state.errors.street}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    value={this.state.city}
                                    onChange={this.setCity}
                                    onBlur={this.validateAddress}
                                    isInvalid={this.state.visited.city && this.state.errors.city}
                                    isValid={this.state.visited.city && !this.state.errors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    value={this.state.state}
                                    onChange={this.setStateName}
                                    onBlur={this.validateAddress}
                                    isInvalid={this.state.visited.state && this.state.errors.state}
                                    isValid={this.state.visited.state && !this.state.errors.state}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.state}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="zip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                    value={this.state.zip}
                                    onChange={this.setZip}
                                    onBlur={this.validateAddress}
                                    maxLength="5"
                                    isInvalid={this.state.visited.zip && this.state.errors.zip}
                                    isValid={this.state.visited.zip && !this.state.errors.zip}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.zip}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.onSubmit} variant="success">Save</Button>
                        <Button onClick={close} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

function validZip(zip) {
    const zipRegEx = /^\d{5}$/;
    return zipRegEx.test(zip);
}

function validEmail(email) {
    // Email RegEx from https://stackoverflow.com/a/46181
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(email);
}

function validPhone(phone) {
    // Phone RegEx from
    const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegEx.test(phone);
}

// expects a string
function isEmpty(text) {
    const whitespaceRegEx = /^\s*$/;
    return whitespaceRegEx.test(text);
}
