import React, { useRef } from 'react'
import {v4 as uuidv4} from 'uuid';
import { useGlobalInfo } from '../contexts/GlobalInformationProvider';

const Auth = () => {

    const inputId = useRef(null);
    const {id, setId, reset, setReset} = useGlobalInfo();
    const handleLogin = () => {
        setId(inputId.current.value)
    }

    const handleCreateId = () => {
        setId(uuidv4());
        setReset(prev=>!prev)
    }

  return (
    <div className={`${ reset ? 'flex' : id === '' ? 'flex' :'hidden'} h-[100vh] w-full  flex-col flex-wrap justify-center items-center text-black bg-gradient-to-r from-blue-600 to-violet-600 `} >
        <div className='w-[50%]'>
            <label htmlFor="auth" className='text-white font-bold'>ID</label>
            <input type="text" id='auth' placeholder='Enter ID here' ref={inputId}
            className='h-8 w-full border-black  border-2 px-2 focus:outline-none placeholder:text-gray-500 '/>
            <div className='flex flex-wrap justify-between mt-6' >
                <button 
                onClick={handleLogin}
                className='px-4 py-2 bg-gray-800 text-white'>Login</button>
                <button 
                onClick={handleCreateId}
                className='px-4 py-2 bg-black text-white'>Create new ID</button>
            </div>
        </div>
    </div>
  )
}

export default Auth;