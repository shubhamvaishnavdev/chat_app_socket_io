import React, { useState } from 'react'
import { ContactModal } from '../components'
import { useContacts } from '../contexts/ContactsProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Contacts = ({ id }) => {

  const [modal, setModal] = useState(false);
  const { contacts, selectContactForConversation, notify } = useContacts();
  const [activeContact, setActiveContact] = useState(0);

  
  return (
    <div className='h-full flex flex-col justify-between'>
      {
        modal ? <ContactModal modal={modal} setModal={setModal} /> : ''
      }
      <div className={`p-2 flex flex-col gap-2 `}>
        {
          //provide name of every contacts
          contacts.map((items, index) => (
            <div
              key={items.id}
              onClick={() => {
                setActiveContact(index);
                selectContactForConversation(items.id,);
              }}
              className={` w-full cursor-pointer ${activeContact === index ? 'bg-sky-600' : ''}`}>
              <p>{items.name}</p>
            </div>
          ))
        }
      </div>
      <div>
        <CopyToClipboard text={id}>
          <button
          onClick={()=> notify('SUCCESS')}
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