import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import ArtistCard from "./ArtistCard"

export default function EventPage({ discovery, setApi }) {
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

  function generatSocialMediaLinks(){
    let html = `` 
    for(let [socialmedia, url] of Object.entries(attraction?.externalLinks)){
      html += `<li><a src="${url[0].url}"${socialmedia}<li>`
      console.log(html, "Social media")
    }
  }

  useEffect(() => {
      getEvents()
    }, [])

  return (
    <>
      <h1>{attraction?.name}</h1>
      <h3>Sjanger:</h3>
      <ul>
        <li>some genre</li>
      </ul>
      <h3>Følg oss på sosiale medier!</h3>
      <ul>
        {generatSocialMediaLinks()}
        <li><Link to={attraction?.externalLinks.spotify[0].url}>spotify</Link></li>
        <li>{console.log(attraction?.externalLinks, "external links")}</li>
      </ul>
      {/** sosiale medier ting */}
      <h2>Festivalpass</h2>
      {events?.map((event) => <EventCard key={event.id} event={event}/>)}
      {artists?.map((artist) => <ArtistCard key={artist.id} artist={artist}/>)}
    </>
  )
}