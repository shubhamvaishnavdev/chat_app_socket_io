import React, { useState } from 'react'
import { OpenConversation, Sidebar } from '../components/index'
import { useNotify } from '../contexts/NotificationProvider'

const Dashboard = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { ToastContainer } = useNotify();

  return (
    <div className='h-[100dvh] w-[100%] flex bg-blue-800'>
      <ToastContainer autoClose={2000} className=" w-16 mx-auto" />
      <Sidebar id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      <OpenConversation id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Dashboard;