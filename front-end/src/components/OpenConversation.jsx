import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../contexts/SocketProvider';
import { useContacts } from '../contexts/ContactsProvider';
import useLocalStorage from '../utils/useLocalStorage';
import { AiOutlineMenu } from "react-icons/ai"

const OpenConversation = ({ id, isOpen, setIsOpen }) => {
  const socket = useSocket();
  const [messageData, setMessageData] = useState('');
  const { selectedContactId } = useContacts();
  const [messages, setMessages] = useLocalStorage('messages', []);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!messageData) return;

    const newMessage = { sender: id, selectedContactId, messageData };
    setMessages((prev) => [...prev, newMessage]);

    socket.emit('send-message', newMessage);
    setMessageData('');
  }, [id, selectedContactId, messageData, setMessages, socket]);


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
    <div className='z-0 absolute h-[100%] w-[100%]  flex flex-col bg-gray-900 md:relative md:w-[75%]'>
      <div className='h-8 w-[100%] flex items-center bg-gray-500 md:hidden' >
        <div className='w-[100%] flex justify-between px-4 items-center'>
          <p className='text-white'>Chatt App</p>
          {
            isOpen ?
              ("") :
              (<AiOutlineMenu onClick={() => setIsOpen(true)} className='text-white text-xl font-bold' />)
          }
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {
          conversationMessages.length > 0 ? (
            conversationMessages.map((item, index) => (
              <div
                key={index}
                className={` font-medium text-white flex flex-wrap  ${item.sender === id ? 'ml-auto justify-end' : 'mr-auto '}`}
              >
                <p className='inline bg-sky-600  px-3 py-1 rounded-full'> {item.messageData} </p>
              </div>
            ))
          )
            : (
              <p className='text-white text-center font-bold pt-8 text-3xl' >Select Contact before starting a chat</p>
            )

        }
      </div>
      <form
        onSubmit={handleSendMessage}
        className='absolute w-[100%] bottom-4 flex justify-center items-center'>
        <input type="text"
          placeholder='write your message'
          value={messageData}
          onChange={(e) => setMessageData(e.target.value)}
          className='h-8 w-[70%] px-2 focus:outline-none bg-gray-700 text-white placeholder:text-gray-400' />
        <button
          className='h-8 w-16 text-white bg-gradient-to-r from-blue-600 to-violet-600'>send</button>
      </form>
    </div>
  )
}

export default OpenConversation;
