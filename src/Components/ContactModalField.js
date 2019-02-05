import React from "react";
import Form from "react-bootstrap/Form";

export default function ContactModalField({
    as,
    controlId,
    label,
    value,
    onChange,
    onBlur,
    visited,
    error,
    ...others
}) {
    let formGroupExraProps = {};
    if (as) {
         formGroupExraProps.as = as;
    }
    return (
        <Form.Group {...formGroupExraProps} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={visited && error}
                isValid={visited && !error}
                {...others}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}
