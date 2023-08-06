import React, { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversation } from '../contexts/ConversationProvider'


const ConversationModal = ({ modal, setModal }) => {

    const { contacts } = useContacts()
    const { createConversation } = useConversation()
    const [selectedContact, setSelectedContact] = useState([]);

    function handleCheckbox(contactId) {
        setSelectedContact(prev => {
            if (prev.includes(contactId)) {  // check contactId is included
                return prev.filter(prevId => {
                    return contactId !== prevId // return new array by removing contact id
                })
            } else {
                return [...prev, contactId] // add new id if it's not present in array
            }
        })
    };

    function handleConversationClick() {
        createConversation(selectedContact);
        setModal(false);
    };

    return (
        <div className={modal ? 'block' : 'hidden'} >
            {modal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl border-2 border-black rounded-lg">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                                    <h3 className="text-3xl font-semibold">
                                        New Contact
                                    </h3>
                                    <span onClick={() => setModal(false)}>
                                        <GrClose className='text-xl font-semibold' />
                                    </span>
                                </div>

                                {/*body*/}
                                <div className="relative h-[auto] w-[20rem] p-6 flex-auto  border-2 border-black border-x-0">
                                    {
                                        contacts.map((items) => (
                                            <div key={items.id} className='h-auto w-full flex  items-center'>
                                                <input type="checkbox" name="conversation" 
                                                id={items.id}
                                                    value={selectedContact.includes(items.id)}
                                                    onChange={() => handleCheckbox(items.id)}
                                                    className='mx-2'
                                                />

                                                <label htmlFor={items.id}>{items.name}
                                                </label>

                                            </div>
                                        ))
                                    }

                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-sky-600  text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleConversationClick}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    )
}

export default ConversationModal;