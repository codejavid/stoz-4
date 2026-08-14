import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({text = "Review app", bgColor="#333333", textColor="white"}) => {

  return (
    <header style={{
        backgroundColor:bgColor,
        color:textColor
    }}>
        <div className='container'>
            <div className='d-flex'>
                <Link to="/">
                  <h1>{text}</h1>
                </Link>
                <Link to="/about">
                  <span>About</span>
                </Link>
                <Link to="/blog">
                  <span>Blog</span>
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Header