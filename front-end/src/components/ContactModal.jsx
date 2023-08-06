import React, { useRef } from 'react'
import {GrClose} from 'react-icons/gr'
import { useContacts } from '../contexts/ContactsProvider';




const ContactModal = ({ modal, setModal }) => {
const idRef = useRef(null);
const nameRef = useRef(null);
const {createContact} = useContacts();

    const handleContactModalClick = () => {
        createContact(idRef.current.value, nameRef.current.value);
        setModal(false);

    };

    return (
        <div className={modal ? 'block ' : 'hidden'} >
            {modal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl border-2 border-black rounded-lg ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-gray-700">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                                    <h3 className="text-3xl font-semibold text-white">
                                        New Contact
                                    </h3>
                                    <span onClick={() => setModal(false)}>
                                    <GrClose className='text-xl font-semibold' />
                                    </span>
                                </div>

                                {/*body*/}
                                <div className="relative h-[auto] w-[20rem] p-6 flex-auto  border-2 border-black border-x-0">
                                    <label htmlFor="ID" className='block font-semibold text-white'>ID</label>
                                    <input type="text" id='ID' ref={idRef} placeholder='79dsd67gdgjh'
                                    className=' w-full border-2 p-2 border-black focus:outline-none bg-gray-900 text-white placeholder:text-gray-400'
                                    />

                                    <label htmlFor="ID" className='block font-semibold mt-2 text-white'>Name</label>
                                    <input type="text" id='ID' ref={nameRef} placeholder='john doe'
                                    className=' w-full border-2 p-2 border-black focus:outline-none  bg-gray-900 text-white placeholder:text-gray-400'
                                    />

                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-white bg-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded"
                                        type="button"
                                        onClick={() => setModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-black  text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleContactModalClick}
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

export default ContactModal;