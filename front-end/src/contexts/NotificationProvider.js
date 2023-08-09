import { createContext, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // required for toast styling

const Notify = createContext();

function useNotify() {
  return useContext(Notify);
}

const NotificationProvider = ({ children }) => {
  
  const notify = (type) => {
    switch (type) {
      case 'ID_COPIED':
        toast.success("ID successfully copied",
          { position: toast.POSITION.TOP_CENTER }
        );
        break;
      case 'CONTACT_ADDED':
        toast.success("Contact added successfully",
          { position: toast.POSITION.TOP_CENTER }
        );
        break;

      case 'ERROR':
        toast.error("something worng!!",
          { position: toast.POSITION.TOP_CENTER }
        );
        break;

        default:
          toast.error("An error occurred");
          break;
        
    }
  };

  return (
    <Notify.Provider value={{notify, ToastContainer}}>
      {children}
    </Notify.Provider >
  )
}

export { NotificationProvider, useNotify };