import FeedbackItem from "./FeedbackItem"



const FeedbackList = ({feedback}) => {


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