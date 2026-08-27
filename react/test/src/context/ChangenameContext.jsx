import { createContext, useState } from "react";


const ChangenameContext = createContext();

export const ChangenameProvider = ({children}) => {


    const [name, setName] = useState("Jagan");

    const changeName = (name) => {
        setName(name);
    }




    return (
        <ChangenameContext.Provider value={{
           name, 
           changeName
        }}>
            {children}
        </ChangenameContext.Provider>
    )

}

export default ChangenameContext;