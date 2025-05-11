import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
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
    console.log("userloggedinn", userLoggedInn)
  }, [])

  const [linkData, setLinkData] = useState(<li><Link to={"/logginn"}>Logg inn</Link></li>)
  useEffect(() => {
      if(JSON.parse(sessionStorage.getItem("loggedinn")) == true){
          setLinkData(<><li><Link to={"/dashboard"}>Min side</Link></li><li><button onClick={handleClick}>Logg ut</button></li></>)
      }
      else{
          setLinkData(<li><Link to={"/logginn"}>Logg inn<i className="arrow"></i></Link></li>)
      }
      console.log("linkdata", linkData)
  }, [userLoggedInn])

  const navigate = useNavigate()
  function handleClick(){
    navigate("/")
    sessionStorage.clear()
    setUserLoggedInn(false)
  }

  const [discovery, setApi] = useState()

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
    <Layout linkData={linkData}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={<EventPage discovery={discovery} setApi={setApi} />}/>
        <Route path='/category/:slug' element={<CategoryPage />}/>
        <Route path='/dashboard' element={<Dashboard handleClick={handleClick}/>}/>
        <Route path='/logginn' element={<LoggInn setUserLoggedInn={setUserLoggedInn}/>}/>
      </Routes>
    </Layout>
  )
}

export default App
