
import { createContext, useEffect, useState } from "react";


const FeedbackContext = createContext();


export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        {
          id:1,
          text:"This is a sample text 1 from context"
        },
        {
          id:2,
          text:"This is a sample text 2 from context"
        },
        // {
        //   id:3,
        //   text:"This is a sample text 3 from context"
        // },
    ]);


    return(
        <FeedbackContext.Provider value={{
            feedback,
            test:"Hey guys"
        }}>
             {children}
        </FeedbackContext.Provider>
    )

}

export default FeedbackContext;