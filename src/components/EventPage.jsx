import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import ArtistCard from "./ArtistCard"

export default function EventPage() {
  const {id} = useParams()
  const [events, setEvents] = useState()
  const [artists, setArtists] = useState()
  const [attraction, setAttraction] = useState()

  const getEvents = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&attractionId=${id}&locale=*`)
    .then((response) => response.json())
    .then((data) => {setEvents(data._embedded.events); setArtists(data._embedded.events[0]._embedded.attractions); setAttraction(data._embedded.events[0]._embedded.attractions[0])})
    .catch((error) => console.error("Fetching failed ", error))
  }

  function generateSocialMedia(){
    let generatedHtml
    if(typeof attraction?.externalLinks != "undefined"){
      generatedHtml = Object.entries(attraction?.externalLinks).map((socialMedia, index) => <li key={index}><Link to={socialMedia[1]}>{socialMedia[0]}</Link></li>)
      return <>{generatedHtml}</>
    }
    else{
      console.log("No social media was found")
    }
  }

  useEffect(() => {
      getEvents()
    }, [])

  return (
    <>
      <h1>{attraction?.name}</h1>
      <section>
        <h3>Sjanger:</h3>
        <ul>
          <li>Segment: {attraction?.classifications[0].segment.name}</li>
          <li>Sjanger: {attraction?.classifications[0].genre.name}</li>
          <li>Under Sjanger: {attraction?.classifications[0].subGenre.name}</li>
          <li>Type: {attraction?.classifications[0].subType.name}</li>
        </ul>
        <h3>Følg oss på sosiale medier!</h3>
        <ul>
          {generateSocialMedia()}
        </ul>
      </section>
      <h2>Festivalpass</h2>
      <section>
        {events?.map((event) => <EventCard key={event.id} event={event}/>)}
      </section>
      <section>
        {artists?.map((artist) => <ArtistCard key={artist.id} artist={artist}/>)}
      </section>
    </>
  )
}