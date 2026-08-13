import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from './shared/Card';
import Button from './shared/Button';

const FeedbackForm = ({ handleAdd }) => {


  const [text, setText] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {

    const trimmedText = e.target.value.trimStart();


    let textError = "";

    if (trimmedText.length < 10) {
      setMessage("Character must be at least 10")
      setBtnDisable(true)
    } else {
      setMessage("");
      setBtnDisable(false)
    }

    setText(trimmedText)

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: uuidv4(),
      text: text
    }

    handleAdd(newFeedback)

    setText("");

    setBtnDisable(true)
  }

  return (

    <Card>

      <h3>Add your reviews</h3>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input type="text" placeholder='Enter your name'
            onChange={handleTextChange} value={text} />
            <Button version="primary" type="submit" isDisabled={btnDisable}>Send</Button>
        </div>

        <p className='message'>{message}</p>
      </form>
    </Card>

  )
}

export default FeedbackForm