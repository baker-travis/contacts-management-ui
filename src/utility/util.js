/**
 * Checks to see if the text is a valid 5 digit zip code
 * @param {String} zip the text to check
 * @returns {Boolean} true if the text is a valid email address
 */
export function validZip(zip) {
    const zipRegEx = /^\d{5}$/;
    return zipRegEx.test(zip);
}

/**
 * Checks to see if the text is a valid email address.
 * @param {String} email the text to check
 * @returns {Boolean} true if the text is a valid email address
 */
export function validEmail(email) {
    // Email RegEx from https://stackoverflow.com/a/46181
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(email);
}

/**
 * Checks to see if the text is a valid phone number. Accepts all formats.
 * @param {String} phone the string to validate
 * @returns {Boolean} true if the text is a valid phone number
 */
export function validPhone(phone) {
    // Phone RegEx from
    const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegEx.test(phone);
}

/**
 * Checks the text for null, undefined, empty, or just whitespace
 * @param {String} text the text to test
 * @returns {Boolean} true if string is empty
 */
export function isEmpty(text) {
    const whitespaceRegEx = /^\s*$/;
    return whitespaceRegEx.test(text);
}