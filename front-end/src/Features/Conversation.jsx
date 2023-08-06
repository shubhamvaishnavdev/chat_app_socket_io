import React, { useContext, useState } from 'react'
import ConversationModal from './ConversationModal';
import { useConversation } from '../contexts/ConversationProvider';
import { useContacts } from '../contexts/ContactsProvider';

const Conversation = ({id}) => {
const [modal,setModal] = useState(false)
const {conversations, selectforOpenConversation} = useConversation(); // contains all selcted ids
const [activeConversation,setActiveConversation] = useState(0); 

  return (
    <div className='h-full flex flex-col justify-between'>
      {
        modal ? <ConversationModal modal={modal} setModal={setModal}  /> : ''
      }
        <div className='p-2'>
           {
            conversations.map((conversation,index)=> (
              <div key={index} 
              onClick={() => {
                setActiveConversation(index);
                selectforOpenConversation(index,conversation.id);
              }}
              className={activeConversation === index ?  'bg-blue-700 cursor-pointer':'cursor-pointer' }
              >
                {
                conversation.recipients.map(r=> r.name).join(', ')
              }
              </div>
            ))
           }
        </div>
        <div>
            <p className='w-full px-2 my-4' >{`your ID: ${id}`}</p>
        <button 
        onClick={() => setModal(true)}
        className='h-[3rem] w-full border-2 border-black text-white bg-sky-600' >New Conversation</button>
        </div>
    </div>
  )
}

export default Conversation;