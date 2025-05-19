import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { fetchWishlist } from '../backend/sanity/services/userService'
import Layout from './components/Layout'
import EventPage from './components/EventPage'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'
import LoggInn from './components/LoggInn'
import SanityEventDetails from './components/SanityEventDetails'


function App() {
  /**useState() that keep track of the users wishlist */
  const [wishList, setWishList] = useState([])
  /**useState() that keeps the users logginn status */
  const [userLoggedInn, setUserLoggedInn] = useState(false)
  /**useState() that holds the html structure of the nav elements connected to logging inn/out changes based on the localstorage*/
  const [logginnMenu, setLogginnMenu] = useState(<li><Link to={"/logginn"}>Logg inn</Link></li>)

  /**useNavigate for navigating through the site without using Link component*/
  const navigate = useNavigate()

  /**
   * on render checks if the user is logged on based on local storage.
   * our localstorage does not implement time to live, encryption or a lookupp table 
   * in our database and is higly unsecure.
   */
  useEffect(() => {
    setUserLoggedInn(JSON.parse(localStorage.getItem("loggedinn")))
  }, [])

  /**
   * When the status of @var userLoggedInn changes check if the user is logged inn and change
   * the @var logginnMenu based on if logged inn or not. 
   * Also fetches the wishlist of the user if logged inn is true with @var getUserWishlist
   */
  useEffect(() => {
      if(JSON.parse(localStorage.getItem("loggedinn")) == true){
          setLogginnMenu(<><li><Link to={"/dashboard"}>Min side<i className="arrow"></i></Link></li>
          <li><button onClick={loggout}>Logg ut<i className="arrow"></i></button></li></>)
          getUserWishlist()
      }
      else{
          setLogginnMenu(<li><Link to={"/logginn"}>Logg inn<i className="arrow"></i></Link></li>)
      }
  }, [userLoggedInn])

  /**
   * fetches the users wishlist based on username of the logged inn user.
   * uses the fetch from userServices in backend.
   */
  const getUserWishlist = async()=>{
    await fetchWishlist(localStorage.getItem("username"))
    .then((data)=> setWishList(data[0].wishlist))
    .catch((error) => console.error("Noe gikk galt med å hente ønskelisten", error))
  }

  /**
   * checks if an event is in the wishlist
   * @param {array} wishList the wishlist that the function should check against
   * @param {Object} event the event that should be checked against the wishlist 
   * @returns {Boolean} true or false based on if the event is in wishlist
   */
  function isWishlisted(wishList, event){
    if(wishList != undefined){
      console.log(wishList, "iswishlisted defined")
      return wishList?.some(wishEvent => wishEvent.apiid === event?.id)
    }
  }

  /**
   * adds a event to the wishlist localy, 
   * does not post the wishlist changes to sanity so will be overwritten when wishlist is updated from sanity
   * @param {Object} event 
   */
  function addToWishlist(event){
    setWishList([...wishList, { apiid: event?.id, title: event?.name}])
  }

  /**
   * removes a event from the wishlist localy,
   * does not post the wishlist changes to sanity so will be overwritten when wishlist is updated from sanity
   * @param {Object} event 
   */
  function removeWishlist(event){
    setWishList(wishList.filter((wishEvent)=>event?.id != wishEvent.apiid))
  }
  
  /**
   * navigates the user to the front page and loggs the user out
   * also clearing the localstorage
   */
  function loggout(){
    navigate("/")
    localStorage.clear()
    setWishList([])
    setUserLoggedInn(false)
  }
  
  return (
    <Layout logginnMenu={logginnMenu}>
      <Routes>
        <Route path='/' element={<Home wishList={wishList} isWishlisted={isWishlisted} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>}/>
        <Route path='/event/:id' element={<EventPage wishList={wishList} isWishlisted={isWishlisted} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>}/>
        <Route path='/category/:slug' element={<CategoryPage />}/>
        <Route path='/dashboard' element={<Dashboard wishList={wishList} loggout={loggout} isWishlisted={isWishlisted} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>}/>
        <Route path='/logginn' element={<LoggInn setUserLoggedInn={setUserLoggedInn} setWishList={setWishList}/>}/>
        <Route path='/sanity-event/:id' element={<SanityEventDetails/>}/>
      </Routes>
    </Layout>
  )
}

export default App
