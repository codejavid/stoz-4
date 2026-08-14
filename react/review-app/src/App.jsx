import React, { useState, useEffect } from 'react'
import Header from './components/Header'

import FeedbackList from './components/FeedbackList'
import FeedbackForm from './components/FeedbackForm'
// import FeedbackStats from './components/FeedbackStats'

import { Routes, Route } from 'react-router-dom'

import About from "./pages/About"
import Blog from "./pages/Blog"


const App = () => {

  return (
    <div>
      <Header />
      <div className='container'>
        <Routes>
          
          <Route path='/' element={
            <>
              <FeedbackForm />
              <FeedbackList />
            </>
          } />

          <Route path='/about' element={
            <>
              <About />
            </>
          } />

          <Route path='/blog' element={
            <>
              <Blog />
            </>
          } />

        </Routes>
      </div>

    </div>
  )
}

export default App



