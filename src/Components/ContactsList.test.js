import React from 'react';
import {
    cleanup
} from 'react-testing-library';
import sortBy from 'lodash.sortby';
import {renderWithRedux} from '../utility/testUtil';

import ContactsList from './ContactsList';

const MOCK_CONTACTS = [{"uuid":"93a9e653-7ef9-4649-ae87-f25ffcbaee0f","firstName":"Binnie","lastName":"Ovendon","email":"bovendon0@marketwatch.com","phone":"5701214125","street":"475 Fair Oaks Hill","city":"Scranton","state":"PA","zip":"18514"},
{"uuid":"ea2516d0-e9c7-4331-8c9c-d70661fbc3d7","firstName":"Gery","lastName":"Horwell","email":"ghorwell1@ucoz.ru","phone":"9413693664","street":"49722 Lawn Parkway","city":"Bonita Springs","state":"FL","zip":"34135"},
{"uuid":"0ff5eb61-b97a-4175-8082-767eb5687fb2","firstName":"Heinrick","lastName":"Benettini","email":"hbenettini2@biblegateway.com","phone":"2021551713","street":"72629 Menomonie Park","city":"Washington","state":"DC","zip":"20299"},
{"uuid":"2f36acac-383c-4d5b-a430-7e0bb1c1ac1f","firstName":"Meredithe","lastName":"Burkill","email":"mburkill3@tinypic.com","phone":"2131532516","street":"486 Vidon Drive","city":"Los Angeles","state":"CA","zip":"90087"},
{"uuid":"1093889d-8491-4e25-b423-bec4f13b0fe8","firstName":"Jennine","lastName":"Bassford","email":"jbassford4@youtu.be","phone":"5748634608","street":"1 Blackbird Court","city":"South Bend","state":"IN","zip":"46614"},
{"uuid":"336d77f8-6418-4e4a-9bed-dfbe5e3abdd1","firstName":"Lynea","lastName":"Walisiak","email":"lwalisiak5@nhs.uk","phone":"9155034015","street":"21 Del Sol Pass","city":"El Paso","state":"TX","zip":"79945"},
{"uuid":"bfaeb975-dc1d-4a51-a297-95b2f63e1437","firstName":"Glynda","lastName":"Bushel","email":"gbushel6@cnbc.com","phone":"2059199530","street":"8741 South Pass","city":"Birmingham","state":"AL","zip":"35210"},
{"uuid":"29f55a98-af70-4ff5-b7cb-6f4cc79b3b48","firstName":"Cull","lastName":"Botwright","email":"cbotwright7@thetimes.co.uk","phone":"2627437463","street":"573 Granby Plaza","city":"Racine","state":"WI","zip":"53405"},
{"uuid":"d530a82b-af2b-472a-896a-872c0f4f0fe9","firstName":"Cherin","lastName":"Hayth","email":"chayth8@over-blog.com","phone":"8635191702","street":"6208 Barnett Place","city":"Lakeland","state":"FL","zip":"33811"},
{"uuid":"b13b8add-70da-42b3-950e-e31de72378d4","firstName":"Bendite","lastName":"MacTrustrie","email":"bmactrustrie9@nationalgeographic.com","phone":"9411767429","street":"4647 Surrey Avenue","city":"Bonita Springs","state":"FL","zip":"34135"}];

describe('<ContactsList />', () => {
    beforeEach(cleanup);

    it('should sort contacts alphabetically by last name', () => {
        const {container} =  renderWithRedux(<ContactsList />, {initialState: {contacts: MOCK_CONTACTS}});
        // Get the first names column
        const firstNames = container.querySelectorAll('tbody tr td:first-of-type');
        const sortedContacts = sortBy(MOCK_CONTACTS, ['lastName', 'firstName', 'state', 'city', 'zip', 'street', 'email']);

        // Verify the two array are the same length
        expect(firstNames).toHaveLength(MOCK_CONTACTS.length);
        for (let i = 0; i < firstNames.length; i++) {
            expect(firstNames[i].textContent).toBe(sortedContacts[i].firstName);
        }
    });
});