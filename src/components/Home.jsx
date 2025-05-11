import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import '../styles/home.scss'

export default function Home({ discovery, setApi }) {
  const [eventContent, setEventContent] = useState();
  const [cityContent, setCityContent] = useState();
  const [cityName, setCityName] = useState("Oslo");
  const [testCityName, setTestCityName] = useState();

  //Findings ID: K8vZ917K7fV
  //Tons ID: K8vZ917oWOV
  //Neon ID: K8vZ917_YJf
  //Skeikampen ID: K8vZ917bJC7

  function CityNameFromClick(input) {
    setCityName(input.target.innerHTML);
    console.log(cityName);
    CheckCityName(cityName);
  }

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
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&city=${cityName}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data, "fra Home – byer");
      setCityContent(data);
    })  
  }, [])

  console.log(cityName, "cityName");
  console.log(cityContent, "cityContent");
  

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
        <Link onClick={CityNameFromClick}>Oslo</Link>
        <Link onClick={CityNameFromClick}>Stockholm</Link>
        <Link onClick={CityNameFromClick}>Berlin</Link>
        <Link onClick={CityNameFromClick}>London</Link>
        <Link onClick={CityNameFromClick}>Paris</Link>
      </article>
    </section>    
    <section>
      {cityContent?._embedded.events.map((city) =>
        <article key={city.id}>
        <h3>{city.name}</h3>
        </article>
      )}
    </section>
    </>
  )
}

/*
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
*/