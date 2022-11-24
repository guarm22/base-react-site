import { createContext, useContext, useState, useEffect } from 'react'
import AuthContext from '../auth'
import { useNavigate } from 'react-router-dom';

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {

}


function GlobalStoreContextProvider(props) {
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({

    });

    const storeReducer = (action) => {
        const {type, payload} = action
        switch(type) {
            default:
                return store;
        }
    }
    
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };