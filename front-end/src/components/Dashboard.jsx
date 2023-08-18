import React, { useState } from 'react'
import { ContactModal, OpenConversation, Sidebar } from '../components/index'
import { useNotify } from '../contexts/NotificationProvider';
import Auth from './Auth.jsx'
import { useGlobalInfo } from '../contexts/GlobalInformationProvider';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { ToastContainer } = useNotify();
  const [modal, setModal] = useState(false);
  const {id,reset, setReset} = useGlobalInfo();
  
  return (
    <div className={`min-h-[100dvh] w-[100%] bg-blue-800 `}>
    <div className={`min-h-[100dvh] w-[100%]  bg-blue-800 ${reset ? 'block' : 'hidden'}`}>
      <Auth/>
    </div>
      <div className={`min-h-[100dvh] w-[100%]  bg-blue-800 ${reset ? 'hidden' : 'flex'}`}>
      <ToastContainer autoClose={2000} className=" w-16 mx-auto" />
      <Sidebar 
      id={id} 
      isOpen={isOpen} 
      setIsOpen={setIsOpen} 
      modal={modal} 
      setModal={setModal} 
      reset={reset}
      setReset={setReset}
      />
      <OpenConversation id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      {
        modal ? <ContactModal modal={modal} setModal={setModal} /> : ''
      }
      </div>
    </div>
  )
}

export default Dashboard;