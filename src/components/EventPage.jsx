import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EventCard from "./EventCard"

export default function EventPage({ discovery, setApi }) {
  const {id} = useParams()
  const [events, setEvents] = useState()

  const getEvents = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&attractionId=${id}&locale=*`)
    .then((response) => response.json())
    .then((data) => setEvents(data._embedded.events))
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
      {/*events[0]?._embedded.attractions.map()*/}
    </>
  )
}