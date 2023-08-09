import React from 'react';
import { Auth, Dashboard } from './components/index';
import useLocalStorage from './utils/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import { NotificationProvider } from './contexts/NotificationProvider';

const App = () => {
  const [id, setId] = useLocalStorage('id', '');
  const dashboard = (
    <SocketProvider id={id} >
      <NotificationProvider>
        <ContactsProvider>
          <Dashboard id={id} />
        </ContactsProvider>
      </NotificationProvider>
    </SocketProvider>
  )

  return (
    <>
      {id !== '' ? dashboard : <Auth setId={setId} />}
    </>
  )
}

export default App;