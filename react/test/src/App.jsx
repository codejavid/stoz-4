import React from 'react'
import Child from './components/Child'


const App = () => {

  const handleMessage = (message) => {
    console.log(message);
  }

  const x = "Hello";


  return (
    <div>
      <Child readX={x} handleMessage={handleMessage}/>
    </div>
  )
}

export default App