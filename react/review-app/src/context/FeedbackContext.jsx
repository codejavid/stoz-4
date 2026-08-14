
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
        {
          id:3,
          text:"This is a sample text 3 from context"
        },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
      item:{},
      edit:false
    })

    const addFeedback = (newFeedback) => {
      setFeedback([newFeedback, ...feedback]);
    }

    const updateFeedback = (id, updItem) => {
      setFeedback(feedback.map((item) => (
        item.id === id ? {...item, ...updItem} : item
      )))
    }

    const deleteFeedback = (id) => {
      setFeedback(feedback.filter(item => item.id !== id))
    }

    const editFeedback = (item) => {
      setFeedbackEdit({
        item:item,
        edit:true
      })
    }


    return(
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            setFeedbackEdit,
            addFeedback,
            updateFeedback,
            deleteFeedback,
            editFeedback
        }}>
             {children}
        </FeedbackContext.Provider>
    )

}

export default FeedbackContext;