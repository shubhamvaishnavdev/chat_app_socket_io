import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage'
import { useContacts } from './ContactsProvider';

const conversationContext = createContext();

function useConversation (){
    return useContext(conversationContext);
}

const ConversationProvider = ({ id,children }) => {
    const [conversations, setConversations] = useLocalStorage('conversatios', [])
    const [selectedConversation,setSelectedConversation] = useState(0); 
    const {contacts} = useContacts(); // contains all data id and name

    function createConversation(recipients) {
        setConversations(prev => {
            return[...prev,{recipients, message:[]}]
        })
    }

    function addMessageToConversation ({recipients, text , sender}) {

    };

    function sendMessage (recipients, text) {
        addMessageToConversation({recipients, text , sender: id})
    };

    const  formattedConversation =  conversations.map((conversation) => {  // message [] user
         const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact =>{
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient , name}
        })
        return { ...conversation, recipients }
    })

    function selectforOpenConversation (val,id){
        setSelectedConversation({val,id});
    }
    
    const value = {
        conversations: formattedConversation,
        createConversation,
        selectedConversation,
        sendMessage,
        selectforOpenConversation
    }



    return (
        <conversationContext.Provider value={value}>
            {children}
        </conversationContext.Provider >
    )
}

export {conversationContext, ConversationProvider, useConversation };