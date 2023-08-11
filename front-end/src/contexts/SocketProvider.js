import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socketContext = createContext();

function useSocket() {
  return useContext(socketContext)
}

const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState()
  const ENDPOINT = process.env.REACT_APP_BACK_END_URL

  useEffect(() => {

    const newSocket = io.connect(ENDPOINT, { query: { id } })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id,ENDPOINT])

  // console.log("process.env.REACT_APP_BACK_END_URL at socket provider: " + process.env.REACT_APP_BACK_END_URL);
  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  )
}



export { useSocket, SocketProvider, socketContext }


