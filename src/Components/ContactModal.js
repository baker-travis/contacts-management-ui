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
    touchedFields: {}
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
            touchedFields: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let errors = this.validate();
        
        // if we have any errors, halt submission
        if (Object.keys(errors).length > 0) {
            this.setState({errors});
            return;
        }
        
        let {
            firstName,
            lastName,
            street,
            city,
            state,
            zip,
            phone,
            email
        } = this.state;
        
        let contact = {
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
        let fields = {
            firstName,
            lastName,
            street,
            city,
            state,
            zip,
            phone,
            email
        } = this.state;
        let errors = {};
        let hasAddressFields = street || city || state || zip;
        // TODO: Validate fields
        
        return errors;
    }

    setFirstName = (e) => {
        const firstName = e.target.value
        this.setState({firstName});
        
        if (isEmpty(firstName)) {
            this.setState({errors: {...this.state.errors, firstName: 'Name is required'}});
        }
    }

    setLastName = (e) => {
        const lastName = e.target.value
        this.setState({lastName});
        
        if (isEmpty(lastName)) {
            this.setState({errors: {...this.state.errors, lastName: 'Name is required'}});
        }
    }
    
    setEmail = (e) => {
        const email = e.target.value
        this.setState({email});
        
        if (!validEmail(email)) {
            this.setState({errors: {...this.state.errors, email: 'Enter a valid email'}});
        }
    }
    
    setPhone = (e) => {
        const phone = e.target.value
        this.setState({phone});
        
        if (!validPhone(phone)) {
            this.setState({errors: {...this.state.errors, phone: 'Enter a valid phone'}});
        }
    }
    
    setStreet = (e) => {
        const street = e.target.value
        this.setState({street});
        
        if (street && isEmpty(street)) {
            this.setState({errors: {...this.state.errors, street: 'Enter a valid address'}});
        }
    }
    
    setCity = (e) => {
        const city = e.target.value
        this.setState({city});
        
        if (city && isEmpty(city)) {
            this.setState({errors: {...this.state.errors, city: 'Enter a valid City'}});
        }
    }
    
    setStateName = (e) => {
        const state = e.target.value
        this.setState({state});
        
        if (state && isEmpty(state)) {
            this.setState({errors: {...this.state.errors, state: 'Enter a valid State'}});
        }
    }
    
    setZip = (e) => {
        const zip = e.target.value;
        this.setState({zip: e.target.value});
        
        // If a zip code is typed in but is not valid...
        if (zip && !validZip(zip)) {
            this.setState({errors: {...this.state.errors, zip: 'Enter a valid 5 digit zip'}});
        }
    }
    
    setTouched = (fieldName) => {
        this.setState({touched: ...this.state.touched, [fieldName]: true});
    }
 
    render() {
        let {contact, close, show} = this.props;
        return (
            <Modal size= "lg" show={show} onHide={close}>
                <Form>
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
                                    onBlur={() => this.setTouched('firstName')}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    value={this.state.lastName}
                                    onChange={this.setLastName}
                                    onBlur={() => this.setTouched('lastName')}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.setEmail}
                                    onBlur={() => this.setTouched('email')}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={this.state.phone}
                                    onChange={this.setPhone}
                                    onBlur={() => this.setTouched('phone')}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="street">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                placeholder="1234 Main St"
                                value={this.state.street}
                                onChange={this.setStreet}
                                onBlur={() => this.setTouched('street')}
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    value={this.state.city}
                                    onChange={this.setCity}
                                    onBlur={() => this.setTouched('city')}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    value={this.state.state}
                                    onChange={this.setStateName}
                                    onBlur={() => this.setTouched('state')}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="zip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                    value={this.state.zip}
                                    onChange={this.setZip}
                                    onBlur={() => this.setTouched('zip')}
                                    maxLength="5"
                                />
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
