import React, { Component } from 'react';
import { Container } from './App.styled';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const saveContacts = localStorage.getItem('Contacts');
    const parseContacts = JSON.parse(saveContacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevState, prevProps) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('There are different');
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }
  takeFormData = ({ name, number }) => {
    this.setState(prevState => {
      if (
        prevState.contacts.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        alert(`${name} is already in contacts`);
        return;
      }
      return {
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      };
    });
  };
  filterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterCorrectData = () => {
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filterContacts = this.filterCorrectData();
    return (
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.takeFormData} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterChange} />
        <ContactList
          resultData={filterContacts}
          onDelete={this.deleteContact}
        />
      </Container>
    );
  }
}
