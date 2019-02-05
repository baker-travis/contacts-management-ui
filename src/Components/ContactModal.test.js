import React from 'react';
import {
    cleanup,
    render,
    fireEvent
} from 'react-testing-library';

import ContactModal from './ContactModal';

const DEFAULT_PROPS = {show: true};

describe('<ContactModal />', () => {
    beforeEach(cleanup);

    describe('Form validation', () => {
        beforeEach(cleanup);
        it('should show error message with invalid `First Name` field', () => {
            const {getByLabelText, queryByText} = render(<ContactModal {...DEFAULT_PROPS} />);
            fireEvent.change(getByLabelText('First Name'), {target: {value: 'Some value'}});
            fireEvent.change(getByLabelText('First Name'), {target: {value: ''}});
            fireEvent.blur(getByLabelText('First Name'));

            expect(queryByText('First name is required')).not.toBeNull();
        });

        it('should show error message with invalid `Last Name` field', () => {
            const {getByLabelText, queryByText} = render(<ContactModal {...DEFAULT_PROPS} />);
            fireEvent.change(getByLabelText('Last Name'), {target: {value: 'Some value'}});
            fireEvent.change(getByLabelText('Last Name'), {target: {value: ''}});
            fireEvent.blur(getByLabelText('Last Name'));

            expect(queryByText('Last name is required')).not.toBeNull();
        });

        it('should show error message with invalid `Phone Number` field', () => {
            const {getByLabelText, queryByText} = render(<ContactModal {...DEFAULT_PROPS} />);
            fireEvent.change(getByLabelText('Phone Number'), {target: {value: 'Some value'}});
            fireEvent.change(getByLabelText('Phone Number'), {target: {value: ''}});
            fireEvent.blur(getByLabelText('Phone Number'));

            expect(queryByText('Enter a valid phone')).not.toBeNull();
        });

        it('should not show error message with valid `Phone Number` field', () => {
            const {getByLabelText, queryByText} = render(<ContactModal {...DEFAULT_PROPS} />);
            fireEvent.change(getByLabelText('Phone Number'), {target: {value: '1234567891'}});
            fireEvent.blur(getByLabelText('Phone Number'));

            expect(queryByText('Enter a valid phone')).toBeNull();
        });

        it('should show error message with invalid `Email` field', () => {
            const {getByLabelText, queryByText} = render(<ContactModal {...DEFAULT_PROPS} />);
            fireEvent.change(getByLabelText('Email'), {target: {value: 'invalidemail'}});
            fireEvent.change(getByLabelText('Email'), {target: {value: ''}});
            fireEvent.blur(getByLabelText('Email'));

            expect(queryByText('Enter a valid email')).not.toBeNull();
        });

        it('should now show error message with valid `Email` field', () => {
            const {getByLabelText, queryByText} = render(<ContactModal {...DEFAULT_PROPS} />);
            fireEvent.change(getByLabelText('Email'), {target: {value: 'email@gmail.com'}});
            fireEvent.blur(getByLabelText('Email'));

            expect(queryByText('Enter a valid email')).toBeNull();
        });

        describe('Form submission validation', () => {
            it('should submit with all values filled in', () => {
                let saveCalled = false;
                const save = () => {
                    saveCalled = true;
                };
                const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                fillFields(getByLabelText);
                fireEvent.click(getByText('Save'));
                expect(saveCalled).toBeTruthy();
            });

            it('should not submit with invalid `First Name`', () => {
                let saveCalled = false;
                const save = () => {
                    saveCalled = true;
                };
                const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                fillFields(getByLabelText);
                fireEvent.change(getByLabelText('First Name'), {target: {value: ''}});
                fireEvent.click(getByText('Save'));
                expect(saveCalled).toBeFalsy();
            });

            it('should not submit with invalid `Last Name`', () => {
                let saveCalled = false;
                const save = () => {
                    saveCalled = true;
                };
                const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                fillFields(getByLabelText);
                fireEvent.change(getByLabelText('Last Name'), {target: {value: ''}});
                fireEvent.click(getByText('Save'));
                expect(saveCalled).toBeFalsy();
            });

            it('should not submit with invalid `Email`', () => {
                let saveCalled = false;
                const save = () => {
                    saveCalled = true;
                };
                const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                fillFields(getByLabelText);
                fireEvent.change(getByLabelText('Email'), {target: {value: 'bademail'}});
                fireEvent.click(getByText('Save'));
                expect(saveCalled).toBeFalsy();
            });

            it('should not submit with invalid `Phone Number`', () => {
                let saveCalled = false;
                const save = () => {
                    saveCalled = true;
                };
                const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                fillFields(getByLabelText);
                fireEvent.change(getByLabelText('Phone Number'), {target: {value: 'badphone'}});
                fireEvent.click(getByText('Save'));
                expect(saveCalled).toBeFalsy();
            });

            describe('Address validation', () => {
                it('should submit with no address values', () => {
                    let saveCalled = false;
                    const save = () => {
                        saveCalled = true;
                    };
                    const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                    fillFields(getByLabelText);
                    fireEvent.change(getByLabelText('Address'), {target: {value: ''}});
                    fireEvent.change(getByLabelText('City'), {target: {value: ''}});
                    fireEvent.change(getByLabelText('State'), {target: {value: ''}});
                    fireEvent.change(getByLabelText('Zip'), {target: {value: ''}});
                    fireEvent.click(getByText('Save'));
                    expect(saveCalled).toBeTruthy();
                });

                it('should not submit with invalid `Street`', () => {
                    let saveCalled = false;
                    const save = () => {
                        saveCalled = true;
                    };
                    const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                    fillFields(getByLabelText);
                    fireEvent.change(getByLabelText('Address'), {target: {value: ''}});
                    fireEvent.click(getByText('Save'));
                    expect(saveCalled).toBeFalsy();
                });

                it('should not submit with invalid `City`', () => {
                    let saveCalled = false;
                    const save = () => {
                        saveCalled = true;
                    };
                    const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                    fillFields(getByLabelText);
                    fireEvent.change(getByLabelText('City'), {target: {value: ''}});
                    fireEvent.click(getByText('Save'));
                    expect(saveCalled).toBeFalsy();
                });

                it('should not submit with invalid `State`', () => {
                    let saveCalled = false;
                    const save = () => {
                        saveCalled = true;
                    };
                    const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                    fillFields(getByLabelText);
                    fireEvent.change(getByLabelText('State'), {target: {value: ''}});
                    fireEvent.click(getByText('Save'));
                    expect(saveCalled).toBeFalsy();
                });

                it('should not submit with invalid `Zip`', () => {
                    let saveCalled = false;
                    const save = () => {
                        saveCalled = true;
                    };
                    const {getByLabelText, getByText} = render(<ContactModal {...DEFAULT_PROPS} onSave={save} />);
                    fillFields(getByLabelText);
                    fireEvent.change(getByLabelText('Zip'), {target: {value: '123'}});
                    fireEvent.click(getByText('Save'));
                    expect(saveCalled).toBeFalsy();
                });
            });
        });
    });
});

function fillFields(getByLabelText) {
    fireEvent.change(getByLabelText('First Name'), {target: {value: 'Some value'}});
    fireEvent.change(getByLabelText('Last Name'), {target: {value: 'Some value'}});
    fireEvent.change(getByLabelText('Email'), {target: {value: 'some.email@gmail.com'}});
    fireEvent.change(getByLabelText('Phone Number'), {target: {value: '1234567891'}});
    fireEvent.change(getByLabelText('Address'), {target: {value: '123 Some St'}});
    fireEvent.change(getByLabelText('City'), {target: {value: 'City'}});
    fireEvent.change(getByLabelText('State'), {target: {value: 'ST'}});
    fireEvent.change(getByLabelText('Zip'), {target: {value: '12345'}});
}