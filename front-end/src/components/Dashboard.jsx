import React, { useState } from 'react'
import { ContactModal, OpenConversation, Sidebar } from '../components/index'
import { useNotify } from '../contexts/NotificationProvider'

const Dashboard = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { ToastContainer } = useNotify();
  const [modal, setModal] = useState(false);
  return (
    <div className='min-h-[100dvh] w-[100%] flex bg-blue-800'>
      <ToastContainer autoClose={2000} className=" w-16 mx-auto" />
      <Sidebar id={id} isOpen={isOpen} setIsOpen={setIsOpen} modal={modal} setModal={setModal} />
      <OpenConversation id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      {
        modal ? <ContactModal modal={modal} setModal={setModal} /> : ''
      }
    </div>
  )
}

export default Dashboard;