import React from 'react'
import { Contacts } from '../components'
import { AiOutlineClose } from 'react-icons/ai';
import { useGlobalInfo } from '../contexts/GlobalInformationProvider';

const Sidebar = ({ id, isOpen, setIsOpen, modal, setModal}) => {

    const {reset, setReset} = useGlobalInfo();

    return (
        <div className={`${isOpen ? 'fixed z-10 w-[80%] block' : 'hidden'} 
        md:fixed md:block md:w-[25%] md:left-0 md:top-0 h-full  bg-gray-600 `}>
            <div className='h-[8%] flex items-center border-2 border-black'>
                <p className='w-full py-2 text-center text-white font-semibold'
                >Contacts</p>
                <AiOutlineClose onClick={() => setIsOpen(false)}
                    className='text-white text-3xl font-bold pr-2 md:hidden' />
            </div>
            <div className='h-[92%] border-black border-2 border-y-0 bg-gray-800'>
                {
                    <Contacts id={id} modal={modal} setModal={setModal} reset={reset} setReset={setReset}/>
                }
            </div>
        </div>
    )
}

export default Sidebar;
