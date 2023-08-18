import { createContext, useContext } from "react";
import useLocalStorage from '../utils/useLocalStorage';


const globalInfo = createContext();

export const useGlobalInfo = () =>{
    return useContext(globalInfo)
}

const GlobalInformationProvider = ({children}) => {
    const [id, setId] = useLocalStorage('id', '');
    const [reset, setReset] = useLocalStorage('reset',false);
    return(
        <globalInfo.Provider value={{id, setId,reset, setReset}} >
            {children}
        </globalInfo.Provider>
    )

}

export default GlobalInformationProvider;