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

    render() {
        let {contact, close, show} = this.props;
        return (
            <Modal size= "lg" show={show}>
                <Modal.Header closeButton onHide={close}>
                    <Modal.Title>
                        {contact ? `Editing Info for ${this.state.firstName} ${this.state.lastName}` : 'New Contact'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={this.state.firstName} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={this.state.lastName} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={this.state.email} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" value={this.state.phone} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" value={this.state.street} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control value={this.state.city} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control value={this.state.state} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Zip</Form.Label>
                            <Form.Control value={this.state.zip} />
                        </Form.Group>
                    </Form.Row>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">Save</Button>
                    <Button onClick={close} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}