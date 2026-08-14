import FeedbackContext from "../context/FeedbackContext"
import FeedbackItem from "./FeedbackItem"
import { useContext } from "react"



const FeedbackList = () => {
  

  const { feedback } = useContext(FeedbackContext)


if(feedback.length === 0) return <h3>These is no items</h3>

  return (
    <div>
        {feedback.map((item) => (
          <FeedbackItem key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default FeedbackList