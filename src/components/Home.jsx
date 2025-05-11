import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import '../styles/home.scss'

export default function Home({ discovery, setApi }) {
  const [pageContent, setPageContent] = useState();

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
      setPageContent(data);
    })  
  }, [])

  console.log(pageContent, "fra pageContent")

  return (
    <>
    <h1>Sommerens Festivaler</h1>
    <section>
      {pageContent?._embedded.attractions.
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
    </>
  )
}