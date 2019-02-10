import React, {useState, useMemo, useRef} from 'react';
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

// Custom hook
function useControlledInput(initialValue) {
    let [value, setValue] = useState(initialValue);
    let [visited, setVisited] = useState(false);

    function updateValue(e) {
        setValue(e.target.value);
    }

    return [value, updateValue, visited, setVisited];
}

export default function ContactModalHooks({contact = {}, close, onSave, show}) {
    let [firstName, setFirstName, firstNameVisited, setFirstNameVisited] = useControlledInput(contact.firstName || '');
    let [lastName, setLastName, lastNameVisited, setLastNameVisited] = useControlledInput(contact.lastName || '');
    let [street, setStreet, streetVisited, setStreetVisited] = useControlledInput(contact.state || '');
    let [city, setCity, cityVisited, setCityVisited] = useControlledInput(contact.city || '');
    let [state, setStateName, stateVisited, setStateVisited] = useControlledInput(contact.state || '');
    let [zip, setZip, zipVisited, setZipVisited] = useControlledInput(contact.zip || '');
    let [phone, setPhone, phoneVisited, setPhoneVisited] = useControlledInput(contact.phone || '');
    let [email, setEmail, emailVisited, setEmailVisited] = useControlledInput(contact.email || '');

    let formRef = useRef();

    function validateAddress() {
        let hasAddressFields = !!(street || city || state || zip);
        let errors = {};

        if (hasAddressFields) {
            errors.street = isEmpty(street) ? 'Enter a valid address' : null;
            errors.city = isEmpty(city) ? 'Enter a valid city' : null;
            errors.state = isEmpty(state) ? 'Enter a valid state' : null;
            errors.zip = validZip(zip) ? null : 'Enter a valid 5 digit zip';
        }
        setStreetVisited(hasAddressFields);
        setCityVisited(hasAddressFields);
        setStateVisited(hasAddressFields);
        setZipVisited(hasAddressFields);

        return errors;
    }

    function validate() {
        let errors = validateAddress();
        errors.firstName = isEmpty(firstName) ? 'First name is required' : null;
        errors.lastName = isEmpty(lastName) ? 'Last name is required' : null;
        errors.email = validEmail(email) ? null : 'Enter a valid email';
        errors.phone = validPhone(phone) ? null : 'Enter a valid phone';

        return errors;
    }

    const errors = useMemo(validate, [
        firstName,
        lastName,
        street,
        city,
        state,
        zip,
        phone,
        email
    ]);

    function onSubmit(e) {
        e.preventDefault();
        
        // if we have any errors, halt submission
        for (let key in errors) {
            if (errors[key]) {
                // set required fields as visited so that the errors show up
                setFirstNameVisited(true);
                setLastNameVisited(true);
                setEmailVisited(true);
                setPhoneVisited(true);
                return;
            }
        }
        
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
        onSave(contact);
        // clear out the form
        formRef.current.reset();
    }

    function onClose() {
        close();
        formRef.current.reset();
    }

    return (
        <Modal size= "lg" show={show} onHide={onClose}>
            <form onSubmit={onSubmit} ref={formRef}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {contact.firstName ? `Editing Info for ${firstName} ${lastName}` : 'New Contact'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <ContactModalField
                            as={Col}
                            controlId="firstName"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            onBlur={() => !firstNameVisited && setFirstNameVisited(!!firstName)}
                            visited={firstNameVisited}
                            error={errors.firstName}
                        />

                        <ContactModalField
                            as={Col}
                            controlId="lastName"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            onBlur={() => !lastNameVisited && setLastNameVisited(!!lastName)}
                            visited={lastNameVisited}
                            error={errors.lastName}
                        />
                    </Form.Row>

                    <Form.Row>
                        <ContactModalField
                            as={Col}
                            controlId="email"
                            label="Email"
                            value={email}
                            onChange={setEmail}
                            onBlur={() => !emailVisited && setEmailVisited(!!email)}
                            visited={emailVisited}
                            error={errors.email}
                            type="email"
                        />

                        <ContactModalField
                            as={Col}
                            controlId="phone"
                            label="Phone Number"
                            value={phone}
                            onChange={setPhone}
                            onBlur={() => !phoneVisited && setPhoneVisited(!!phone)}
                            visited={phoneVisited}
                            error={errors.phone}
                            type="tel"
                        />
                    </Form.Row>

                    <ContactModalField
                        controlId="street"
                        label="Address"
                        value={street}
                        onChange={setStreet}
                        onBlur={validateAddress}
                        visited={streetVisited}
                        error={errors.street}
                        placeholder="1234 Main St"
                    />

                    <Form.Row>
                        <ContactModalField
                            as={Col}
                            controlId="city"
                            label="City"
                            value={city}
                            onChange={setCity}
                            onBlur={validateAddress}
                            visited={cityVisited}
                            error={errors.city}
                        />

                        <ContactModalField
                            as={Col}
                            controlId="state"
                            label="State"
                            value={state}
                            onChange={setStateName}
                            onBlur={validateAddress}
                            visited={stateVisited}
                            error={errors.state}
                        />

                        <ContactModalField
                            as={Col}
                            controlId="zip"
                            label="Zip"
                            value={zip}
                            onChange={setZip}
                            onBlur={validateAddress}
                            visited={zipVisited}
                            error={errors.zip}
                        />
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={onSubmit} variant="success">Save</Button>
                    <Button onClick={onClose} variant="secondary">Close</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

