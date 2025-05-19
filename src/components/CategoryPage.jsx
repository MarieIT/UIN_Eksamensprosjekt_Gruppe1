import { useParams, Link } from "react-router-dom"
import '../styles/categorypage.scss'
import { useEffect, useState } from "react"
import AttractionCard from "./AttractionCard";
import EventCard from "./EventCard";


export default function CategoryPage({}) {
  const { slug } = useParams()
  const [categoryId, setCategoryId] = useState()
  const [categoryName, setCategoryName] = useState()
  const [selecedCountry, setSelectedCountry] = useState()
  const [selectedCity, setSelectedCity] = useState()
  const [dato, setDato] = useState();
  const [eventsFromFetch, setEventsFromFetch] = useState();
  const [attractionsFromFetch, setAttractionsFromFetch] = useState();
  const [venuesFromFetch, setVenuesFromFetch] = useState();
  
  useEffect(() => {
    getFindSuggest();
  }, [categoryId])

  useEffect(()=>{
    translateSlug()
  }, [slug])

  //Filter for by og land
  function handleChangeSelectCountry(e) {
    e.preventDefault(e)
    if(e.target.value === 'velg-land'){
      setSelectedCountry('*')
    }
    else{
      setSelectedCountry(e.target.value)
    }
  }

  function handleChangeSelectCity(e) {
    e.preventDefault();
    switch(e.target.value){
      case 'oslo':
        setSelectedCity('59.9138688,10.7522454')
        return
      case 'stockholm':
        setSelectedCity('59.3327036,18.0656255')
        return
      case 'kobenhavn':
        setSelectedCity('55.6760968,12.5683371')
        return
      case 'velg-by':
        setSelectedCity('*')
        return
    }
    setSelectedCity(e.target.value)
  }

  function handleChangeDate(e) {
    e.preventDefault();
    setDato(e.target.value);
    console.log(dato, "imputdate")
    
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let tmpSearch = e.target.search.value;
    await fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&keyword=${tmpSearch}&locale=*&segmentId=${categoryId}`)
      .then((response) => response.json())
      .then((data) => {setEventsFromFetch(data._embedded.events); setAttractionsFromFetch(data._embedded.attractions); setVenuesFromFetch(data._embedded.venues)})
      .catch((error) => 
        console.error("Skjedde noe feil ved fetch av søk", error)
    );
    
  }
  
  const getFindSuggest = async () => {
    await fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&segmentId=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {setEventsFromFetch(data._embedded.events); setAttractionsFromFetch(data._embedded.attractions); setVenuesFromFetch(data._embedded.venues)})
    .catch((error) => console.error("Fetching from suggest failed", error))
  }

  const getFilteredSearch = async () => {
    await fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&latlong=${selectedCity}&locale=*&countryCode=${selecedCountry}&geoPoint=59.9138688,10.7522454&startEndDateTime=${dato}T14:35:00Z&segmentId=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {setEventsFromFetch(data._embedded.events); setAttractionsFromFetch(data._embedded.attractions); setVenuesFromFetch(data._embedded.venues)})
    .catch((error) => console.error("Noe gikk galt med filtersøk", error))
  }

  const [byFraFilterKnapp, setByFraFilterKnapp] = useState();
  const handleFilter = (e)=> {
   e.preventDefault()
   getFilteredSearch()
  }
  function translateSlug(){
    switch(slug){
      case "music":
        setCategoryId('KZFzniwnSyZfZ7v7nJ')
        setCategoryName('Musikk')
        return;
      case "sports":
        setCategoryId('KZFzniwnSyZfZ7v7nE')
        setCategoryName('Sport')
        return;
      case "theatre":
        setCategoryId('KZFzniwnSyZfZ7v7na')
        setCategoryName('Teater/Show')
        return;
      default:
        setCategoryName("Det er ikke en gyldig kategori")
        return;
    }
  }

  return(
    <>
      <h1>{categoryName}</h1>
      <h3>Filtrert søk</h3>         
      <section className="filter-search"> 
        <form id="filtercategory">
          <label value="dateInput" htmlFor="dato">Dato:</label>
            <input type="date" id="dato" onChange={handleChangeDate} />
          <label htmlFor="countries">Land:</label>
          <select onChange={handleChangeSelectCountry} id="countries" name="land">
            <option value="velg-land">Velg et land</option>
            <option value="NO">Norge</option>
            <option value="SE">Sverige</option>
            <option value="DK">Danmark</option>
          </select>
          <label htmlFor="byer">By:</label>
          <select onChange={handleChangeSelectCity} id="byer" name="byer">
            <option value="velg-by">Velg en by</option>
            <option value="oslo">Oslo</option>
            <option value="stockholm">Stockholm</option>
            <option value="kobenhavn">København</option>
          </select>
          <button type="submit" onClick={handleFilter} name="filtrer">Filtrer</button>
        </form>
        <form id="searchform" onSubmit={handleSubmit}>  
          <h2>Søk</h2>
          <label htmlFor="search">Søk etter event, attraksjon eller spillested</label>
          <input type="search" id="search" placeholder="findings" /*onChange={handleChangeSearch}*/ />
          <button>Søk</button>
        </form>
      </section>
      <h2>Attraksjoner</h2>
      <section className="attraction-section">
        {attractionsFromFetch?.map((event, index)=> <AttractionCard key={index} event={event}/>)}
      </section>
      <h2>Eventer</h2>
      <section className="events-section">
        {eventsFromFetch?.map((event, index)=> <EventCard key={index} event={event}/>)}
      </section>
      <h2>Spillesteder</h2>
      <section className="venue-section">
        {venuesFromFetch?.map((event, index)=> <article key={index}>
            <h3>{event?.name}</h3>
            <ul>
              <li>{event?.country ? event.country.name: "Land kommer snart"}</li>
              <li>{event?.city ? event.city.name: "By kommer snart"}</li>
            </ul>
            <Link to={event?.url}>Les mer om spillestedet</Link>
          </article>)}
      </section>
    </>
  )
}