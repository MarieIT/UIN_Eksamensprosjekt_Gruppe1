import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/dashboard.scss"
import { fetchProfilePageInfo } from "../../backend/sanity/services/userService"
import EventCard from "./EventCard"
import filledStar from '../assets/StarFilled.svg'
import hollowStar from '../assets/StarHollow.svg'

export default function Dashboard({wishList, handleClick, isWishlisted, addToWishlist, removeWishlist}) {
  const [user, setUser] = useState()
  const [purchases, setPurchases] = useState()
  const [user2, setUser2] = useState()

  

  const getProfileCardInfo = async () => {
    const data = await fetchProfilePageInfo("mariab29")
    setUser(data[0])
  }

  const getPurchasedEvents = async () => {
    let apiids = ``
    user?.prevpurchase.map(purchase => apiids += purchase.apiid + ", ")
    console.log(apiids, "apiids")
    await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=D7ioqsgGEEqH9C5FsLqZZzGw54kRgsYp&id=${apiids}&locale=*`)
    .then((response) => response.json())
    .then((data) => setPurchases(data))
    .catch((error) => console.error("Fetching failed ", error))
    console.log(user, "user data")
  }
  
  function getFriendEventRecomondation(friend){
    if(friend?.commonEvents.length > 0){
      return <p>{friend?.name} og du ønsker begge å dra på <span>{friend?.commonEvents[0].title}</span>, hva med å dra sammen?</p>
    }
    else
    {
      return <p>Du ønsker å dra på <span>{user?.wishlist[0].title}</span>, hva med å spørre {friend?.name} om å dra?</p>
    }
  }

  useEffect(()=>{
    setUser2(JSON.parse(localStorage.getItem("user")))
    getProfileCardInfo()
  },[])

  useEffect(()=>{
    getPurchasedEvents()
  }, [user])

  return (
    <>
      <h1>Dashbord</h1>
      <section id="user-info">
        <h2>{user?.name}</h2>
        <button onClick={handleClick}>Logg ut</button>
        <img src={user?.image}/>
      </section>
      <section id= "user-purchases">
        <h2>Mine Kjøp</h2>
        {purchases?._embedded.events.map((event, index) => <EventCard key={event?.id} event={event} isWishlisted={isWishlisted(wishList, event)} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>)}
      </section>
      <section id="user-wishlist">
        <h2>Min Ønskeliste</h2>
        <ul>
          {user?.wishlist.map((event, index) => <li key={index}><Link to={`/sanity-event/${event.apiid}`}>{event.title}</Link>{isWishlisted ? <img className="star" src={filledStar}/>: <img className="star" src={hollowStar}/>}</li>)}
        </ul>
      </section>
      <section id="user-friends">
        <h2>Venner</h2>
        {user?.friends.map((friend, index) => <article key={index}>
          <img src={friend.image}/>
          <h3>{friend.name}</h3>
          {getFriendEventRecomondation(friend)}
        </article>)}
      </section>  
    </>
  )
}