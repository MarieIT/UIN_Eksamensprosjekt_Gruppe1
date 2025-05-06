import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { Routes, Route, Navigate } from 'react-router-dom';
import EventPage from './components/EventPage'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import LoggInn from './components/LoggInn'

function App() {
  const [userLoggedInn, setUserLoggedInn] = useState(false)
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({username: "TomHeine", password: "123"}))
    setUserLoggedInn(JSON.parse(sessionStorage.getItem("loggedinn")))
    console.log(userLoggedInn)
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={<EventPage />}/>
        <Route path='/category/:slug' element={<CategoryPage />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/logginn' element={userLoggedInn ? <Navigate to={"/dashboard"}/>: <LoggInn setUserLoggedInn={setUserLoggedInn}/>}/>
      </Routes>
    </Layout>
  )
}

export default App
