import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeleteContactModal({show, close, contact, onDelete}) {
    // This means the redux store hasn't set a contact to delete yet.
    if (!contact) {
        return null;
    }

    console.log(contact);

    return (
        <Modal size= "sm" show={show}>
            <Modal.Header closeButton onHide={close}>
                <Modal.Title>
                    Deleting {`${contact.firstName} ${contact.lastName}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete {`${contact.firstName} ${contact.lastName}`}?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onDelete(contact.uuid)} variant="danger">Delete</Button>
                <Button onClick={close} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}