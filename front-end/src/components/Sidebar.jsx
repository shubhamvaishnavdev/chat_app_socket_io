import React from 'react'
import { Contacts } from '../components'

const Sidebar = ({ id }) => {



    return (
        <div className='h-full w-[25%] bg-gray-600 '>
            <div className='h-[8%] flex '>
                <button 
                    className='w-full py-2 border-2 border-l-0 border-black text-white font-semibold' 
                >Contacts</button>
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