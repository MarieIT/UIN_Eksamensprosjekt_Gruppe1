import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import EventCard from "./EventCard";
import AttractionCard from "./AttractionCard";
import '../styles/home.scss'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Home({ isWishlisted, wishList, addToWishlist, removeWishlist }) {
  const [eventContent, setEventContent] = useState();
  const [cityContent, setCityContent] = useState();
  const [cityName, setCityName] = useState("Oslo");

  function CityNameFromClick(input) {
    input.preventDefault();
    setCityName(input.target.innerHTML);
  }

  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/attractions?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&id=K8vZ917K7fV,%20K8vZ917oWOV,%20K8vZ917_YJf,%20K8vZ917bJC7&locale=*')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setEventContent(data);
    })  
  }, [])
  
  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&size=10&city=${cityName}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setCityContent(data);
    })  
  }, [cityName]);
  
  return (
    <>
    <h1>Sommerens Festivaler</h1>
    <section className="hoved-events">
      {eventContent?._embedded.attractions.
        map((event) => 
          <AttractionCard event={event}/>)}
    </section>
    <section className="by-knapper">
      <h2>Hva skjer i verdens storbyer?</h2>
      <article>
        <Link onClick={CityNameFromClick}>Oslo</Link>
        <Link onClick={CityNameFromClick}>Stockholm</Link>
        <Link onClick={CityNameFromClick}>Berlin</Link>
        <Link onClick={CityNameFromClick}>London</Link>
        <Link onClick={CityNameFromClick}>Paris</Link>
      </article>
    </section>    
    <section className="artikkel-fra-byer">
      {cityContent?._embedded.events.
          map((cityEvent) => <EventCard key={cityEvent?.id} event={cityEvent} isWishlisted={isWishlisted(wishList, cityEvent)} addToWishlist={addToWishlist} removeWishlist={removeWishlist}/>)}
    </section>
    </>
  )
}