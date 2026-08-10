import React from 'react'

const Header = ({text = "Review app", bgColor="#333333", textColor="white"}) => {

  return (
    <header style={{
        backgroundColor:bgColor,
        color:textColor
    }}>
        <div className='container'>
            <h1>{text}</h1>
        </div>
    </header>
  )
}

export default Header