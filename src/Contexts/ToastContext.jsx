import { createContext, useContext, useState } from "react";
import ToastSnackbar from "../Components/ToastSnackbar";

let ToastContext = createContext({});

export const ToastProvider = ({children}) => {
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('')

    const showToast = (message) => {
        setToastMessage(message);
        setOpenToast(true);
    
        setTimeout(() => {
          setOpenToast(false)
        }, 2000)
      };
    
      const hideToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenToast(false);
      };
    return(
        <>
            <ToastContext.Provider value={{showToast: showToast}}>
                <ToastSnackbar open={openToast} showToast={showToast} hideToast={hideToast} toastMessage={toastMessage}/>
                {children}
            </ToastContext.Provider>
        </>
    )
}

// Custom hook
export const useToast = () => {
  return useContext(ToastContext);
}