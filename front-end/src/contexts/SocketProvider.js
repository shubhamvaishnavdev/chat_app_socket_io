import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socketContext = createContext();

 function useSocket() {
  return useContext(socketContext)
}

 const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState()

  useEffect(() => {

    const newSocket = io.connect(
      
      process.env.BACK_END_URL,
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  )
}



export {useSocket,SocketProvider, socketContext}


