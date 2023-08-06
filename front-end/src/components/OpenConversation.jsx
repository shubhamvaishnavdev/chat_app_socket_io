import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../contexts/SocketProvider';
import { useContacts } from '../contexts/ContactsProvider';
import useLocalStorage from '../utils/useLocalStorage';

const OpenConversation = ({ id }) => {
  const socket = useSocket();
  const [messageData, setMessageData] = useState('');
  const { selectedContactId , ToastContainer} = useContacts();
  const [messages, setMessages] = useLocalStorage('messages', []);

  const handleSendMessage = useCallback(() => {
    if (!messageData) return;
    setMessages((pre) => {
      return[...pre, {sender: id,selectedContactId, messageData}]
    })
    socket.emit('send-message', { sender: id, selectedContactId, messageData });
    setMessageData('');
  }, [id, selectedContactId, messageData,setMessages, socket]);

  const receiveMessage = useCallback(({ sender, selectedContactId, messageData }) => {
    setMessages(prev => [...prev, { sender, selectedContactId, messageData }]);
  }, [setMessages]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', receiveMessage);

    return () => {
      socket.off('receive-message', receiveMessage);
    };
  }, [socket, receiveMessage]);


const conversationMessages = messages.filter(
  message =>
    (message.sender === id && message.selectedContactId === selectedContactId) ||
    (message.sender === selectedContactId && message.selectedContactId === id)
);

  return (
    <div className=' relative h-[100%] w-[75%] flex flex-col bg-gray-900'>
\      <div>
        {      
          conversationMessages.length > 0 ? (
            conversationMessages.map((item, index) => (
              <div
                key={index}
                className={` font-medium text-white text-xl flex flex-wrap gap-2  ${item.sender === id ? 'ml-auto justify-end' : 'mr-auto '}`}
              >
               <p className='inline bg-sky-600  p-2'> {item.messageData} </p>               
              </div>
            ))
          )          
: (
            <p className='text-white text-center font-bold pt-8 text-3xl' >start a new chat</p>
          )

        }
      </div>
      <div className='absolute w-[100%] bottom-4 flex justify-center items-center'>
        <input type="text"
          placeholder='write your message'
          value={messageData}
          onChange={(e) => setMessageData(e.target.value)}
          className='h-8 w-[70%] px-2 focus:outline-none bg-gray-700 text-white placeholder:text-gray-400' />
        <button
          onClick={handleSendMessage}
          className='h-8 w-16 text-white bg-gradient-to-r from-blue-600 to-violet-600'>send</button>
      </div>
    </div>
  )
}

export default OpenConversation;
