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
  const [dato, setDato] = useState(cleanDato());
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
    setSelectedCountry(e.target.value)
    console.log(selecedCountry, "country")
  }

  function handleChangeSelectCity(e) {
    e.preventDefault();
    setSelectedCity(e.target.value)
    console.log(selectedCity, "City")
  }
  //Setter dato
  //https://www.geeksforgeeks.org/how-to-format-javascript-date-as-yyyy-mm-dd/

  function cleanDato () {
    const date = new Date();
    const newDate = date.toISOString();
    const finalDate = newDate.length > 0 ? newDate.slice(0, -14) : newDate;
    return finalDate;    
  }
  
  console.log(dato, "cleanDato")

  let imputDate = "0000-00-00";
  function handleChangeDate(e) {
    e.preventDefault();
    imputDate = e.target.value;
    
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
    .then((data) => {setEventsFromFetch(data._embedded.events); setAttractionsFromFetch(data._embedded.attractions); setVenuesFromFetch(data._embedded.venues); console.log(data)})
    .catch((error) => console.error("Fetching from suggest failed", error))
  }

  const getFilteredSearch = async () => {
    await fetch(`https://app.ticketmaster.com/discovery/v2/https://app.ticketmaster.com/discovery/v2/suggest?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&latlong=59.9138688,10.7522454&locale=*&countryCode=NO&geoPoint=59.9138688,10.7522454&startEndDateTime=2025-10-15T14:35:00Z&segmentId=${categoryId}`)
  }

  const [byFraFilterKnapp, setByFraFilterKnapp] = useState();
  function handleFilter() {
    const byliste = ["kobenhavn", "stockholm", "oslo"];
    let filterBy = selectedCity;
    for (let i = 0; i < byliste.length; i++) {
      if (byliste[i] == "oslo") {
        console.log(filterBy, "match byer");
        setByFraFilterKnapp(filterBy);
      } else {
        console.log("njet fra byer")
      }
      
    }
    if (selectedCity == "kobenhavn" && selecedCountry == "danmark") {
      console.log("yeah")
    } else {
      return null;
    }
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
      <section className="filter-search"> 
        <h3>Filtrert søk</h3>         
        <form action={handleFilter} id="filtercategory">
          <label value="dateInput" htmlFor="dato">Dato:</label>
            <input type="date" id="dato" onChange={handleChangeDate} />
          <label htmlFor="countries">Land:</label>
          <select onChange={handleChangeSelectCountry} id="countries" name="land">
            <option value="velg-land">Velg et land</option>
            <option value="norge">Norge</option>
            <option value="sverige">Sverige</option>
            <option value="danmark">Danmark</option>
          </select>
          <label htmlFor="byer">By:</label>
          <select onChange={handleChangeSelectCity} id="byer" name="byer">
            <option value="velg-by">Velg en by</option>
            <option value="oslo">Oslo</option>
            <option value="stockholm">Stockholm</option>
            <option value="kobenhavn">København</option>
          </select>
          <button type="submit" name="filtrer">Filtrer</button>
        </form>
        <form id="searchform" onSubmit={handleSubmit}>  
          <h2>Søk</h2>
          <label htmlFor="search">Søk etter event, attraksjon eller spillested</label>
          <input type="search" id="search" placeholder="findings" /*onChange={handleChangeSearch}*/ />
          <button>Søk</button>
        </form>
      </section>
      <section>
        <h2>Attraksjoner</h2>
        {attractionsFromFetch?.map((event, index)=> <AttractionCard key={index} event={event}/>)}
      </section>
      <section>
        <h2>Eventer</h2>
        {eventsFromFetch?.map((event, index)=> <EventCard key={index} event={event}/>)}
      </section>
      <section>
        <h2>Spillesteder</h2>
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