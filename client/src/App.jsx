import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Learderboard from '../pages/Learderboard'
import Profile from '../pages/Profile'
import Navbar from '../components/Navbar'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login';
import Problems from '../pages/Problems'
import Contest from '../pages/Contest'


export default function App() {
  return (
    <>
      <BrowserRouter>
      
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/leaderboard' element={<Learderboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/problems' element={<Problems/>}/>
          <Route path='/contest' element={<Contest/>}/>
        </Routes> 
      </BrowserRouter>
    </>
  )
}
