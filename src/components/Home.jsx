import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import EventCard from "./EventCard";
import AttractionCard from "./AttractionCard";
import '../styles/home.scss'

/**
 * Component that renders the home page of the site
 * @param isWishlisted function that checks if a event is wishlisted
 * @param wishList useState() containing the users wishlist
 * @param addToWishlist function for adding event to wishlist
 * @param removeWishlist function for removing event from the wishlist
 */
export default function Home({ isWishlisted, wishList, addToWishlist, removeWishlist }) {
  /**useState() for holding the fetched attractions Findings, Neon, Skeikampen og Tons of rock festivalene*/
  const [attractionContent, setAttractionContent] = useState();
  /**useState() for keeping the fetched events filtered on city */
  const [cityContent, setCityContent] = useState();
  /**useState() for what city the fetch should filter on */
  const [cityName, setCityName] = useState("Oslo");

  /**when city button is clicked Sets the @var cityName based on the button clicked */
  function CityNameFromClick(input) {
    input.preventDefault();
    setCityName(input.target.innerHTML);
  }

  /**on render fetch the 4 festivals Findings, Neon, Skeikampen og Tons of rock from ticketmaster api*/
  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/attractions?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&id=K8vZ917K7fV,%20K8vZ917oWOV,%20K8vZ917_YJf,%20K8vZ917bJC7&locale=*')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setAttractionContent(data);
    })  
  }, [])
  
  /**when @var cityName changes fetch events based on @var cityName */
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
      {attractionContent?._embedded.attractions.
        map((event) => 
          <AttractionCard key={event?.id} event={event}/>)}
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