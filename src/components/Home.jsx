import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import '../styles/home.scss'

export default function Home({ discovery, setApi }) {
  const [eventContent, setEventContent] = useState();
  const [cityContent, setCityContent] = useState();

  //Findings ID: K8vZ917K7fV
  //Tons ID: K8vZ917oWOV
  //Neon ID: K8vZ917_YJf
  //Skeikampen ID: K8vZ917bJC7

  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/attractions?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&id=K8vZ917K7fV,%20K8vZ917oWOV,%20K8vZ917_YJf,%20K8vZ917bJC7&locale=*')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data, "fra Home ");
      setEventContent(data);
    })  
  }, [])

  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&city=oslo,%20paris,%20stockholm,%20berlin,%20london')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data, "fra Home ");
      setCityContent(data);
    })  
  }, [])

  console.log(eventContent, "fra eventContent")
  console.log(cityContent, "Fra cityContent")

  return (
    <>
    <h1>Sommerens Festivaler</h1>
    <section>
      {eventContent?._embedded.attractions.
        map((event) => 
          <article key={event.id}>
            <h2>{event.name}</h2>
            <img src={event.images.
            filter(image => image.width > 1000)[0].url}/>
          <Link to={`/event/${event.id}`} className="mainEventBtn">Les mer om {event.name} her!</Link>
          </article>)}
    </section>
    <section className="by-knapper">
      <h2>Hva skjer i verdens storbyer?</h2>
      <article>
        <Link>Oslo</Link>
        <Link>Stockholm</Link>
        <Link>Berlin</Link>
        <Link>London</Link>
        <Link>Paris</Link>
      </article>
    </section>    
    <section>
      {cityContent?._embedded.events.
        map((cityEvent) => <article key={cityEvent.id}>
          <img src={cityEvent.images.
            filter(image => image.width > 1000)[0].url}/>
          <h3>{cityEvent.name}</h3>
          <p>{cityEvent.dates.start.localDate}</p>
          <p>{cityEvent.dates.start.localTime}</p>
          <p>{cityEvent._embedded.venues[0].city.name}</p>
          <p>{cityEvent._embedded.venues[0].country.name}</p>
          <p>{cityEvent._embedded.venues[0].name}</p>
      </article>)}
    </section>
    </>
  )
}