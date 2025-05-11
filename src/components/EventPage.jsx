import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function EventPage({ discovery, setApi }) {
  const {id} = useParams()
  const [event, setEvent] = useState()

  useEffect(() => {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&id=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "event page ");
        setEvent(data._embedded.events[0]);
      })  
    }, [])

  return (
    <>
      <h1>{event?.name}</h1>
      <section>
        <ul>
        </ul>
      </section>
    </>
  )
}