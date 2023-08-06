import React from 'react'
import { OpenConversation, Sidebar } from '../components/index'

const Dashboard = ({ id }) => {

  return (
    <div className='h-[100vh] w-full flex bg-blue-800'>
      <Sidebar id={id} />
      {<OpenConversation id={id}/>}
    </div>
  )
}

export default Dashboard;