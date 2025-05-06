import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom';
import EventPage from './components/EventPage'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import LoggInn from './components/LoggInn'

function App() {
  const [userLoggedInn, setUserLoggedInn] = useState([])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={<EventPage />}/>
        <Route path='/category/:slug' element={<CategoryPage />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/logginn' element={<LoggInn setUserLoggedInn={setUserLoggedInn}/>}/>
      </Routes>
    </Layout>
  )
}

export default App
