import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

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
            email: contact.email || ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        // TODO: validate the fields
        let contact = {};

        contact.firstName = this.state.firstName;
        contact.lastName = this.state.lastName;
        contact.street = this.state.street;
        contact.city = this.state.city;
        contact.state = this.state.state;
        contact.zip = this.state.zip;
        contact.phone = this.state.phone;
        contact.email = this.state.email;
        this.props.onSave(contact);
    }

    render() {
        let {contact, close, show} = this.props;
        return (
            <Modal size= "lg" show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {contact ? `Editing Info for ${this.state.firstName} ${this.state.lastName}` : 'New Contact'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                value={this.state.firstName}
                                onChange={(e) => this.setState({firstName: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                value={this.state.lastName}
                                onChange={(e) => this.setState({lastName: e.target.value})}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={this.state.email}
                                onChange={(e) => this.setState({email: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                value={this.state.phone}
                                onChange={(e) => this.setState({phone: e.target.value})}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            placeholder="1234 Main St"
                            value={this.state.street}
                            onChange={(e) => this.setState({street: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                value={this.state.city}
                                onChange={(e) => this.setState({city: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                value={this.state.state}
                                onChange={(e) => this.setState({state: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                value={this.state.zip}
                                onChange={(e) => this.setState({zip: e.target.value})}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={this.onSubmit} variant="success">Save</Button>
                    <Button onClick={close} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}