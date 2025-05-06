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
  const [discovery, setApi] = useState();

  useEffect(() => {
    //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
    fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&keyword=findings%20festival&locale=*')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      setApi(data);
    })  
  }, [])


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={<EventPage discovery={discovery} setApi={setApi} />}/>
        <Route path='/category/:slug' element={<CategoryPage />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/logginn' element={userLoggedInn ? <Navigate to={"/dashboard"}/>: <LoggInn setUserLoggedInn={setUserLoggedInn}/>}/>
      </Routes>
    </Layout>
  )
}

export default App
