import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../contexts/SocketProvider';
import { useContacts } from '../contexts/ContactsProvider';
import useLocalStorage from '../utils/useLocalStorage';
import { AiOutlineMenu } from "react-icons/ai"
import ScrollToBottom from 'react-scroll-to-bottom';

const OpenConversation = ({ id, isOpen, setIsOpen }) => {
  const socket = useSocket();
  const [messageData, setMessageData] = useState('');
  const { selectedContactId } = useContacts();
  const [messages, setMessages] = useLocalStorage('messages', []);
  const messagesEndRef = useRef(null); // Create a ref for the scroll target

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom on message update
  }, [messages]);

  const conversationMessages = messages.filter(
    message =>
      (message.sender === id && message.selectedContactId === selectedContactId) ||
      (message.sender === selectedContactId && message.selectedContactId === id)
  );


  return (
    <div className='z-0 absolute right-0 top-0 min-h-[100svh] w-[100%] flex flex-col bg-gray-900 
    md:w-[75%] '>
      <div className='fixed z-10 h-8 w-[100%] flex items-center bg-gray-500 md:hidden' >
        <div className=' w-[100%] flex justify-between px-4 items-center'>
          <p className='text-white'>Chatt App</p>
          {
            isOpen ?
              ("") :
              (<AiOutlineMenu
                onClick={() => setIsOpen(true)}
                className='text-white text-xl font-bold' />)
          }
        </div>
      </div>

      <ScrollToBottom className='flex flex-col gap-4 px-4 pt-10 pb-20 md:pt-4 overflow-y-hidden'>
        {
          conversationMessages.length > 0 ? (
            conversationMessages.map((item, index) => (
              <div
                key={index}
                className={` font-medium text-white flex flex-wrap p-1 ${item.sender === id ? 'ml-auto justify-end' : 'mr-auto '}`}
              >
                <p className='inline bg-sky-600  px-3 py-1 rounded-full'> {item.messageData} </p>
              </div>
            ))
          )
            : (
              <p className='text-white text-center font-bold mt-8 text-xl md:text-3xl overflow-y-hidden' >Select Contact before starting a chat</p>
            )

        }
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </ScrollToBottom>
      <div className='w-[100%] flex justify-center bg-green-700' >
        <form
          onSubmit={handleSendMessage}
          className='fixed w-[70%] bottom-4 flex justify-center items-center  '>
          <input type="text"
            placeholder='write your message'
            value={messageData}
            onChange={(e) => setMessageData(e.target.value)}
            className='h-8 w-[70%] px-2 focus:outline-none bg-gray-700 text-white placeholder:text-gray-400' />
          <button
            className='h-8 w-16 text-white bg-gradient-to-r from-blue-600 to-violet-600'>send</button>
        </form>
      </div>
    </div>
  )
}

export default OpenConversation;
