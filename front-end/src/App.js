import React from 'react';
import { Auth, Dashboard } from './components/index';
import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import { NotificationProvider } from './contexts/NotificationProvider';
import { useGlobalInfo } from './contexts/GlobalInformationProvider';


const App = () => {
  // const [id, setId] = useLocalStorage('id', '');
  const {id} = useGlobalInfo();
  const dashboard = (
      <SocketProvider>
        <NotificationProvider>
          <ContactsProvider>
            <Dashboard />
          </ContactsProvider>
        </NotificationProvider>
      </SocketProvider>
  )

  return (
    <>
      {
        id !== '' ? dashboard : <Auth />
      }
    </>
  )
}

export default App;