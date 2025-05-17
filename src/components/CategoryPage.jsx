import { useParams } from "react-router-dom"
import '../styles/categorypage.scss'
import { useEffect, useRef, useState } from "react"


export default function CategoryPage({ setSearch, handleClickSearch, searchResult}) {
  const { slug } = useParams()
  const [genre, setGenre] = useState();
  const [mapData, setMapData] = useState();
  const [content, setContent] = useState();
  const [formData, setFormData] = useState();
  const [events, setEvents] = useState();
  const [venue, setVenue] = useState();
  



  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&size=10&classificationName=${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setGenre(data._embedded.attractions);
    })
  }, [slug]);

  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&size=10&city=oslo`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setEvents(data._embedded.events);
    })
  }, [])

  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&city=oslo`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setVenue(data._embedded.events);
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value, "fra input")
  }

  const [mapOutSearch, setMapOutSearch] = useState();
  useEffect(() => {
    setMapOutSearch(
      searchResult?._embedded.events.map((event => 
        <>
          <h3></h3>
          <article key={event.id}>
            <p>{event.name}</p>
            
          </article>
          
        </>
      ))
    )
    console.log(searchResult)
  }, [searchResult])

  useEffect(() => {
    setFormData(() =>
      <section className="filter-search"> 
        <h3>Filtrert søk</h3>         
        <form action={slug} id="filtercategory">
          <label>
            Dato: <input type="date" />
          </label>
          <label htmlFor="countries">Land:</label>
          <select id="countries" name="land">
            <option value="velg-land">Velg et land</option>
            <option value="norge">Norge</option>
            <option value="sverige">Sverige</option>
            <option value="danmark">Danmark</option>
          </select>
          <label htmlFor="byer">By:</label>
          <select id="byer" name="byer">
            <option value="velg-by">Velg en by</option>
            <option value="oslo">Oslo</option>
            <option value="stockholm">Stockholm</option>
            <option value="kobenhavn">København</option>
          </select>
          <button type="submit" name="filtrer">Filtrer</button>
        </form>
        <form onSubmit={handleSubmit}>  
          <h3>Søk</h3>
          <label htmlFor="search">Søk etter event, attraksjon eller spillested</label>
          <input type="search" id="search" placeholder="findings" onChange={handleChange} />
          <button onClick={handleClickSearch}>Søk</button>
        </form>
      </section>
    )
  }, []);

  console.log(genre, "genre")
  

  useEffect(() => {
    setMapData(() =>
        <>
          <h2>Attractions</h2>
          <section id="attractioncategory">
              {genre?.
                map((attract) => <article key={attract.id}>
                  <img src={attract.images.
                    filter(image => image.width > 1000)[0].url}/>
                  <h3>{attract.name}</h3>               
              </article>)}
          </section>
          <h2>Arrangementer</h2>
          <section id="eventsection">
              {events?.map((events) => 
                <article key={events.id}>
                  <img src={events.images[0].url}/>
                  <h3>{events.name}</h3>
                </article>
              )}
          </section>
          <h2>Spillesteder</h2>
          <section id="venuesection">
              {venue?.map((venues) => 
                <article key={venues.id}>
                  <h3>{venues._embedded.venues[0].name} </h3>
                </article>
              )}
          </section>
        </>
    )
  }, [genre])

  function translateSlug(){
    switch(slug){
      case "music":
        return (
          <>

            {formData}
            {mapOutSearch}
            {mapData}           
          </>)
      case "sports":
        return (
          <>
            {formData}
            {mapData}
          </>)
      case "theatre":
        return (
          <>
            {formData}
            {mapData}
          </>)
      default:
        return "Det er ikke en gyldig kategori"
    }
    
  }

  return translateSlug()
}