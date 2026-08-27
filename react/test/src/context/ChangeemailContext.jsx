import { createContext, useState } from "react";


const ChangeemailContext = createContext();

export const ChangeemailProvider = ({children}) => {


    const [email, setEmail] = useState("j@gmail.com");

    const changeEmail = (email) => {
        setEmail(email);
    }




    return (
        <ChangeemailContext.Provider value={{
           email, 
           changeEmail
        }}>
            {children}
        </ChangeemailContext.Provider>
    )

}

export default ChangeemailContext;