import React from 'react';
import moxios from 'moxios';
import {
    fireEvent,
    cleanup,
    waitForElement
} from 'react-testing-library';
import {renderWithRedux} from './utility/testUtil';

import App from './App';

const MOCK_CONTACT = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'John.Doe@gmail.com',
    phone: '1234567891',
    street: '123 Main St',
    city: 'Dallas',
    state: 'TX',
    zip: '12345'
};

describe('<App />', () => {
    beforeAll(() => {
        moxios.install();
    });

    afterAll(() => {
        moxios.uninstall();
    });

    beforeEach(cleanup);

    describe('Add new contact modal', () => {

        it('Should show add new contact modal when `Add Contact` is clicked', async () => {
            const {getByText} = renderWithRedux(<App />);

            fireEvent.click(getByText('Add Contact'));

            const modalTitle = await waitForElement(() => 
                getByText('New Contact')
            );

            expect(modalTitle).not.toBeNull();
        });

        it('Should POST to contacts endpoint when `Save` is clicked', (done) => {
            const {getByText, getByLabelText} = renderWithRedux(<App />);

            setupAddContact(getByText, getByLabelText);

            // Ensure contact is POSTed
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                expect(request.config.url).toBe('http://localhost:8080/api/v1/contacts');
                expect(request.config.method).toBe('post');
                expect(JSON.parse(request.config.data)).toEqual(MOCK_CONTACT);
                done();
            });
        });

        it('Should add new contact to table when `Save` is clicked', (done) => {
            const {getByText, getByLabelText, container} = renderWithRedux(<App />);

            setupAddContact(getByText, getByLabelText);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                
                // Respond to post with success
                request.respondWith({
                    status: 201,
                    response: {}
                }).then(() => {
                    moxios.wait(async () => {
                        // Respond to get contacts with list containing mocked contact
                        const request = moxios.requests.mostRecent();
                        request.respondWith({
                            status: 200,
                            response: [{...MOCK_CONTACT, uuid: '1'}]
                        });

                        // Wait till row is rendered
                        await waitForElement(() => 
                            getByText('Delete')
                        );

                                          // This is needed to convert to array for comparison below
                        const tableRows = [].slice.call(container.querySelectorAll('tbody tr'));

                        // Gets the first cell (first name) of the only row
                        const firstRowFirstCell = container.querySelector('tbody tr:first-of-type td:first-of-type');

                        expect(tableRows).toHaveLength(1);
                        expect(firstRowFirstCell.textContent).toBe(MOCK_CONTACT.firstName);
                        done();
                    });
                });
            });
        });
    });

    describe('DeleteContact modal', () => {
        it('should delete contact after clicking `Delete` button', (done) => {
            const uuid = '1';
            const {getByText, getAllByText} = renderWithRedux(<App />, {initialState: {contacts: [{...MOCK_CONTACT, uuid}]}});

            fireEvent.click(getByText('Delete'));

            const deleteButtons = getAllByText('Delete');

            fireEvent.click(deleteButtons[deleteButtons.length - 1]);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                expect(request.config.method).toBe('delete');

                const url = request.config.url;

                const urlParts = url.split('/');
                const lastPathPart = urlParts[urlParts.length - 1];
                expect(lastPathPart).toBe(uuid);
                done();
            });
        });
    });
});

async function setupAddContact(getByText, getByLabelText) {
    fireEvent.click(getByText('Add Contact'));

    await waitForElement(() => 
        getByText('New Contact')
    );

    // fill out form
    fireEvent.change(getByLabelText('First Name'), {target: {value: MOCK_CONTACT.firstName}});
    fireEvent.change(getByLabelText('Last Name'), {target: {value: MOCK_CONTACT.lastName}});
    fireEvent.change(getByLabelText('Email'), {target: {value: MOCK_CONTACT.email}});
    fireEvent.change(getByLabelText('Phone Number'), {target: {value: MOCK_CONTACT.phone}});
    fireEvent.change(getByLabelText('Address'), {target: {value: MOCK_CONTACT.street}});
    fireEvent.change(getByLabelText('City'), {target: {value: MOCK_CONTACT.city}});
    fireEvent.change(getByLabelText('State'), {target: {value: MOCK_CONTACT.state}});
    fireEvent.change(getByLabelText('Zip'), {target: {value: MOCK_CONTACT.zip}});

    // Click save button
    fireEvent.click(getByText('Save'));
}