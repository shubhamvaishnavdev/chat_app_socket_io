import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage'
import { ToastContainer,toast } from 'react-toastify';

const contactContext = createContext();

function useContacts() {
  return useContext(contactContext)
}

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [selectedContactId,setSelectedContactId] = useState (1);

  const notify = (type) => {
    switch (type) {
      case 'SUCCESS':
        toast.success("ID Copied",
          { position: toast.POSITION.TOP_CENTER }
        );
        break;

      case 'ERROR':
        toast.error("something worng!!",
          { position: toast.POSITION.TOP_CENTER }
        );
        break;
      default: toast("error")
        break;
    }
  };

    function createContact (id, name) {
    setContacts((prev) => {
      return [...prev, { id, name }]
    })
  };

  function selectContactForConversation (id) {
    setSelectedContactId(id);
  }

  

  return (
    <contactContext.Provider value={{ contacts, createContact,selectContactForConversation,selectedContactId,notify, ToastContainer }}>
      {children}
    </contactContext.Provider>
  )
}

export { contactContext, ContactsProvider, useContacts };