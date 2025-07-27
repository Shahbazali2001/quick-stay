import { AppContext } from "./AppContext";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;




const values = {

};

export const ContextProvider = ({ children }) => {
  return( 
    <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
  )
};



