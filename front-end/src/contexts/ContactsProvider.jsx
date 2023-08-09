import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage'
import { useNotify } from './NotificationProvider';

const contactContext = createContext();

function useContacts() {
  return useContext(contactContext)
}

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [selectedContactId,setSelectedContactId] = useState (1);
  const {notify} = useNotify();

  

    function createContact (id, name) {
    setContacts((prev) => {
      notify('CONTACT_ADDED')
      return [...prev, { id, name }]
    })
  };

  function selectContactForConversation (id) {
    setSelectedContactId(id);
  }

  

  return (
    <contactContext.Provider value={{ contacts,setContacts, createContact,selectContactForConversation,selectedContactId }}>
      {children}
    </contactContext.Provider>
  )
}

export { contactContext, ContactsProvider, useContacts };