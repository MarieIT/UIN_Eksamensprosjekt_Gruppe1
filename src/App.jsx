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
          setLinkData(<><li><Link to={"/dashboard"}>Min side<i className="arrow"></i></Link></li>
          <li><button onClick={handleClick}>Logg ut<i className="arrow"></i></button></li></>)
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
  
  const [searchResult, setSearchResult] = useState();
  const [tempSearch, setTempSearch] = useState();
  const [search, setSearch] = useState("temp");

  const handleClickSearch = async() => {
    console.log(search, "fra knapp")
    fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&keyword=${search}&locale=*`)
      .then((response) => response.json())
      .then((data) => setSearchResult(data))
      .catch((error) => 
        console.error("Skjedde noe feil ved fetch av søk", error)
      );
  };
  
  return (
    <Layout linkData={linkData}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={<EventPage  />}/>
        <Route path='/category/:slug' element={<CategoryPage setSearch={setSearch} handleClickSearch={handleClickSearch} searchResult={searchResult} />}/>
        <Route path='/dashboard' element={<Dashboard handleClick={handleClick}/>}/>
        <Route path='/logginn' element={<LoggInn setUserLoggedInn={setUserLoggedInn}/>}/>
      </Routes>
    </Layout>
  )
}

export default App
