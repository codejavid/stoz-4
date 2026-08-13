import React from 'react'

const FeedbackStats = ({feedback}) => {
  return (
    <div>
        Length : <h3>{feedback.length}</h3>
    </div>
  )
}

export default FeedbackStats