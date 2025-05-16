import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/dashboard.scss"
import { fetchProfilePageInfo } from "../../backend/sanity/services/userService"
import EventCard from "./EventCard"

export default function Dashboard({handleClick}) {
  const [user, setUser] = useState()
  const [purchases, setPurchases] = useState()
  const [user2, setUser2] = useState()

  

  const getProfileCardInfo = async () => {
    const data = await fetchProfilePageInfo("mariab29")
    setUser(data[0])
    console.log(user, "user data")
    
  }

  const getPurchasedEvents = async () => {
    let apiids = ``
    user?.prevpurchase.map(purchase => apiids += purchase.apiid + ", ")
    console.log(apiids, "apiids")
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=D7ioqsgGEEqH9C5FsLqZZzGw54kRgsYp&id=${apiids}&locale=*`)
    .then((response) => response.json())
    .then((data) => setPurchases(data))
    .catch((error) => console.error("Fetching failed ", error))
  }

  useEffect(()=>{
    setUser2(JSON.parse(localStorage.getItem("user")))
    getProfileCardInfo()
    getPurchasedEvents()
  },[])

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
        {purchases?._embedded.events.map((event, index) => <EventCard key={index} event={event}/>)}
      </section>
      <section id="user-wishlist">
        <h2>Min Ønskeliste</h2>
        <ul>
          {user?.wishlist.map((event, index) => <li key={index}><Link to={`/event/${event.apiid}`}>{event.title}</Link></li>)}
        </ul>
      </section>
      <section id="user-friends">
        <h2>Venner</h2>
        {user?.friends.map((friend, index) => <article key={index}>
          <img src={friend.image}/>
          <h3>{friend.name}</h3>
          <p>{friend.name} og du ønsker å dra på <span>Wacken 2026</span>, hva med å dra sammen ?</p>
        </article>)}
      </section>  
    </>
  )
}