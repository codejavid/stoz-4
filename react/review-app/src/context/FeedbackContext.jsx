
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const FeedbackContext = createContext();


export const FeedbackProvider = ({ children }) => {

  const [feedback, setFeedback] = useState([
    // {
    //   id:1,
    //   text:"This is a sample text 1 from context"
    // },
    // {
    //   id:2,
    //   text:"This is a sample text 2 from context"
    // },
    // {
    //   id:3,
    //   text:"This is a sample text 3 from context"
    // },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {

    console.log("Hello im started");

    fetchFeedback();

  }, []);


  const fetchFeedback = async () => {

    try {

      const response = await axios.get("https://6a84604753754283b0b86dca.mockapi.io/api/v1/lists");

      setFeedback(response.data);

    } catch (err) {
      console.log("ERROR")
    }

  }

  const addFeedback = async (newFeedback) => {

    try {

      const response = await axios.post("https://6a84604753754283b0b86dca.mockapi.io/api/v1/lists", newFeedback, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setFeedback([response.data, ...feedback]);

    } catch (err) {
      console.log("ERROR")
    }


  }

  const updateFeedback = async (id, updItem) => {

    try {

      const response = await axios.put(`https://6a84604753754283b0b86dca.mockapi.io/api/v1/lists/${id}`, updItem, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setFeedback(feedback.map((item) => (
        item.id === id ? { ...item, ...response.data } : item
      )))
    } catch (err) {
      console.log("ERROR")
    }

  }

  const deleteFeedback = async (id) => {

    if (window.confirm("Are you sure")) {
      try {

        const response = await axios.delete(`https://6a84604753754283b0b86dca.mockapi.io/api/v1/lists/${id}`);

        setFeedback(feedback.filter(item => item.id !== id))
      } catch (err) {
        console.log("ERROR")
      }

    }


  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true
    })
  }


  return (
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