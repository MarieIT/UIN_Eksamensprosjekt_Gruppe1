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
import SanityEventDetails from './components/SanityEventDetails'

function App() {
  const [wishList, setWishList] = useState([{id: "Z698xZb_Z174K0o", name: "imagine dragons"}])

  function isWishlisted(wishList, event){
    return wishList.some(wishEvent => wishEvent.id === event?.id)
  }

  function addToWishlist(event){
    setWishList([...wishList, { id: event?.id, name: event?.name}])
  }

  function removeWishlist(event){
    setWishList(wishList.filter((wishEvent)=>event?.id != wishEvent.id))
  }
  const [userLoggedInn, setUserLoggedInn] = useState(false)
  useEffect(() => {
    setUserLoggedInn(JSON.parse(sessionStorage.getItem("loggedinn")))
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
        <Route path='/' element={<Home wishList={wishList} isWishlisted={isWishlisted} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>}/>
        <Route path='/event/:id' element={<EventPage wishList={wishList} isWishlisted={isWishlisted} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>}/>
        <Route path='/category/:slug' element={<CategoryPage />}/>
        <Route path='/dashboard' element={<Dashboard wishList={wishList} handleClick={handleClick} isWishlisted={isWishlisted} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>}/>
        <Route path='/logginn' element={<LoggInn setUserLoggedInn={setUserLoggedInn} setWishList={setWishList}/>}/>
        <Route path='/sanity-event/:id' element={<SanityEventDetails/>}/>
      </Routes>
    </Layout>
  )
}

export default App
