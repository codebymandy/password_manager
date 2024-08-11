import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'


function App() {
 

  return (
    <>
         <Navbar/>
         {/* <div className="absolute  top-0 z-[-2] h-screen w-screen bg-green-100 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
         <Manager/>
         <Footer/>
    </>
  )
}

export default App
