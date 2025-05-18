import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchSanityEvent } from "../../backend/sanity/services/eventService"
import { useState } from "react"
import '../styles/sanityeventdetails.scss'

export default function SanityEventDetails(){
    const {id} = useParams()
    const [sanityEvent, setSanityEvent] = useState()
    const [eventInfo, setEventInfo] = useState()
    
    const getSanityEvent = async () => {
        const data = await fetchSanityEvent(id)
        setSanityEvent(data[0])
    }

    const getEventInfo = async () => {
        await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*`)
        .then((response) => response.json())
        .then((data) => setEventInfo(data))
        .catch((error) => console.error("Fetching failed ", error))
    }

    useEffect(()=>{
        getSanityEvent()
    }, [])

    useEffect(()=>{
        getEventInfo()
    }, [sanityEvent])

    return(
        <>
            <h1>{sanityEvent?.title}</h1>
            <section id="eventdetailssection">
                <img src={eventInfo?.images.filter(image => image.width > 1000)[0].url}/>
                <ul className="event-info">
                    <li>Event type: {eventInfo?.type}</li>
                    <li>Event dato: {eventInfo?.dates.start.localDate}</li>
                    <li>Tidspunkt: {eventInfo?.dates.start.localTime}</li>
                    <li>Land: {eventInfo?._embedded.venues[0].country.name}</li>
                    <li>By: {eventInfo?._embedded.venues[0].city.name}</li>
                    <li>Lokalet: {eventInfo?._embedded.venues[0].name}</li>
                </ul>
            </section>
            <h2>Andre brukere som ønsker å dra på {sanityEvent?.title}</h2>
            <section id="shared-wishlist-section">
                {sanityEvent?.wishlistreference.map((user, index) => <article key={index}>
                    <h3>{user.name}</h3>
                    <img src={user.image}/>
                </article>)}
            </section>
            <h2>Andre brukere som har kjøpt biletter til {sanityEvent?.title}</h2>
            <section id="shared-purchases">
                {sanityEvent?.previouspurchasereference.map((user, index) => <article key={index}>
                    <h3>{user.name}</h3>
                    <img src={user.image}/>
                </article>)}
            </section>
        </>
    )
}