import React, { useEffect, useState } from 'react'
import { useContacts } from '../contexts/ContactsProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsTrash3 } from 'react-icons/bs';
import { useNotify } from '../contexts/NotificationProvider';

const Contacts = ({ id, setModal }) => {
  const { contacts, setContacts, selectedContactId, selectContactForConversation } = useContacts();
  const { notify } = useNotify();
  const [activeContact, setActiveContact] = useState(0);

  //delete single contact from sidebar
  function handleContactDelete(deleteId) {
    const afterDeletion = contacts.filter((item) => item.id !== deleteId)
    setContacts(afterDeletion);
  }

  function handleReset(){
    localStorage.clear();
    window.location.reload()
  }
useEffect(()=>{
  if(contacts.length && selectedContactId === 1){
    selectContactForConversation(contacts[0].id)
  }
},[selectContactForConversation])



  return (
    <div className={`h-full flex flex-col justify-between`}>
      <div className={`h-auto flex flex-col gap-1 `}>
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
                  onClick={() => handleContactDelete(items.id)}
                  className='text-white' />
              </div>
            ))

          ) :
          (<p className='text-white p-2' >Create new contacts from below</p>)
        }
      </div>
      <div className='mt-auto w-full'>
        <button
          onClick={handleReset}
          className='h-[3rem] w-full border-t-2 border-black text-white bg-gray-700' >Reset Everything
        </button>
        <CopyToClipboard text={id}>
          <button
            onClick={() => notify('ID_COPIED')}
            className='h-[3rem] w-full border-t-2 border-black text-white bg-gray-700'>
            Copy your ID
          </button>
        </CopyToClipboard>
        <button
          onClick={() => setModal(true)}
          className='h-[3rem] w-full border-y-2 border-black  text-white bg-gradient-to-r from-blue-600 to-violet-600' >New Contacts
        </button>
      </div>
    </div>
  )
}

export default Contacts;