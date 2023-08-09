import React, { useState } from 'react'
import { ContactModal } from '../components'
import { useContacts } from '../contexts/ContactsProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {BsTrash3} from 'react-icons/bs';
import { useNotify } from '../contexts/NotificationProvider';


const Contacts = ({ id }) => {

  const [modal, setModal] = useState(false);
  const { contacts, setContacts, selectContactForConversation } = useContacts();
  const {notify} = useNotify();
  const [activeContact, setActiveContact] = useState(0);

  //delete single contact from sidebar
  function handleContactDelete(deleteId){
    const afterDeletion = contacts.filter((item)=>item.id !== deleteId)
    setContacts(afterDeletion);
  }

  return (
    <div className='h-full flex flex-col justify-between'>
      {
        modal ? <ContactModal modal={modal} setModal={setModal} /> : ''
      }
      <div className={`flex flex-col gap-1 `}>
        {contacts.length !== 0 ?
          (//provide name of every contacts
            contacts.map((items, index) => (
              <div
                key={items.id}
                onClick={() => {
                  setActiveContact(index);
                  selectContactForConversation(items.id,);
                }}
                className={` w-full cursor-pointer p-2 flex justify-between items-center ${activeContact === index ? 'bg-sky-600 ' : 'bg-gray-500'}`}>
                <p className='text-white' >{items.name}</p> 
                <BsTrash3 
                onClick={()=>handleContactDelete(items.id)}
                className='text-white'/>
              </div>
            ))
            
            ) :
          (<p className='text-white p-2' >Create new contacts from below</p>)
        }
      </div>
      <div>
        <CopyToClipboard text={id}>
          <button
            onClick={() => notify('ID_COPIED')}
            className='h-[3rem] w-full border-t-2 border-black text-white bg-gray-700'>
            Copy your ID
          </button>
        </CopyToClipboard>
        <button
          onClick={() => setModal(true)}
          className='h-[3rem] w-full border-y-2 border-black  text-white bg-gradient-to-r from-blue-600 to-violet-600' >New Contacts</button>
      </div>
    </div>
  )
}

export default Contacts;