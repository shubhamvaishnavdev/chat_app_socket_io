import React from 'react';
import { Auth, Dashboard } from './components/index';
import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import { NotificationProvider } from './contexts/NotificationProvider';
import useLocalStorage from './utils/useLocalStorage';

const App = () => {
  const [id, setId] = useLocalStorage('id', '');
  
  const dashboard = (
    <SocketProvider id={id} setId={setId} >
      <NotificationProvider>
        <ContactsProvider>
          <Dashboard id={id} setId={setId}/>
        </ContactsProvider>
      </NotificationProvider>
    </SocketProvider>
  );

  return (
    <>
      {id !== '' ? dashboard : <Auth id={id} setId={setId}/>}
    </>
  );
};

export default App;
