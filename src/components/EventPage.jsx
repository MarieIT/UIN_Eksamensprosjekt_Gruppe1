import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import ArtistCard from "./ArtistCard"

export default function EventPage({ discovery, setApi }) {
  const {id} = useParams()
  const [events, setEvents] = useState()
  const [artists, setArtists] = useState()

  const getEvents = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&attractionId=${id}&locale=*`)
    .then((response) => response.json())
    .then((data) => {setEvents(data._embedded.events); setArtists(data._embedded.events[0]._embedded.attractions)})
    .catch((error) => console.error("Fetching failed ", error))
  }

  useEffect(() => {
      getEvents()
      console.log(events, "Event-page")
    }, [])

  return (
    <>
      <h1>{/** */}</h1>
      {events?.map((event) => <EventCard key={event.id} event={event}/>)}
      {artists?.map((artist) => <ArtistCard artist={artist}/>)}
    </>
  )
}