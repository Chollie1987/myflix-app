import React from 'react'
import Signin from './components/Signin'
// import Navbar from './components/Navbar'
// import Home from './components/Home'
import Main from './components/Main'
import { Route, Routes } from 'react-router-dom'
import MovieDetail from './components/MovieDetail'


function App() {
  return (
    <div>
      {/* <Navbar/>
      <Home/> */}
      
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/movieDetail" element={<MovieDetail/>} />
      </Routes>
    </div>
  )
}

export default App
