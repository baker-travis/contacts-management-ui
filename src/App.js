import React, { Component } from 'react';

import ContactsList from './Components/ContactsList';
import Header from './Components/Header';
import ContactModal from './Components/ContactModal';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <div className="mainContent">
          <h1>Maine Doe's Contacts</h1>
          <ContactsList />
        </div>
      </div>
    );
  }
}

export default App;
