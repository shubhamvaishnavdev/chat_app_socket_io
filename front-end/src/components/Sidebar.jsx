import React from 'react'
import { Contacts } from '../components'
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ id, isOpen, setIsOpen }) => {



    return (
        <div className={`${isOpen ? 'z-10 w-[80%] inline-block' : 'hidden'} h-full md:w-[25%] bg-gray-600 md:inline-block`}>
            <div className='h-[8%] flex items-center border-2 border-l-0 border-black'>
                <button 
                    className='w-full py-2  text-white font-semibold' 
                >Contacts</button>
                <AiOutlineClose onClick={()=>setIsOpen(false)} 
                className='text-white text-3xl font-bold pr-2' />
            </div>
            <div className='h-[92%] border-black border-2 border-y-0 bg-gray-800'>
                {
                    <Contacts id={id} />
                }
            </div>
        </div>
    )
}

export default Sidebar;