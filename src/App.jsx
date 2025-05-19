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
import { fetchWishlist } from '../backend/sanity/services/userService'

function App() {
  const [wishList, setWishList] = useState([])

  const getUserWishlist = async()=>{
    await fetchWishlist(localStorage.getItem("username"))
    .then((data)=> setWishList(data[0].wishlist))
    .catch((error) => console.error("Noe gikk galt med å hente ønskelisten", error))
    console.log("something happened", wishList)
  }

  function isWishlisted(wishList, event){
    if(wishList != undefined){
      console.log(wishList, "iswishlisted defined")
      return wishList?.some(wishEvent => wishEvent.apiid === event?.id)
    }
  }

  function addToWishlist(event){
    setWishList([...wishList, { apiid: event?.id, title: event?.name}])
  }

  function removeWishlist(event){
    setWishList(wishList.filter((wishEvent)=>event?.id != wishEvent.apiid))
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
          getUserWishlist()
      }
      else{
          setLinkData(<li><Link to={"/logginn"}>Logg inn<i className="arrow"></i></Link></li>)
      }
  }, [userLoggedInn])

  const navigate = useNavigate()
  function handleClick(){
    navigate("/")
    sessionStorage.clear()
    localStorage.clear()
    setWishList([])
    setUserLoggedInn(false)
  }
  
  const [searchResult, setSearchResult] = useState();
  const [tempSearch, setTempSearch] = useState();
  const [search, setSearch] = useState("temp");

  const handleClickSearch = async() => {
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
