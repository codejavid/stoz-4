import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


const FeedbackStatsInContext = () => {

  const {feedback} = useContext(FeedbackContext);  

  return (
    <div>from context : {feedback.length}</div>
  )
}

export default FeedbackStatsInContext