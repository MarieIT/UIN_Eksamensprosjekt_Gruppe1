import { useParams } from "react-router-dom"
import '../styles/categorypage.scss'
import { useCallback, useEffect, useRef, useState } from "react"


export default function CategoryPage({}) {
  const { slug } = useParams()
  const [genre, setGenre] = useState();
  const [mapData, setMapData] = useState();
  const [content, setContent] = useState();
  const [formData, setFormData] = useState();
  const [events, setEvents] = useState();
  const [venue, setVenue] = useState();

  
  //Filter for by og land
  const [filter, setFilter] = useState("sverige");
  useEffect(() => {
    console.log(filter);
  }, [filter])

  function LoopFilter(input) {
    if (input.name == "sverige") {
      console.log("yea")
    }
  }
  
  LoopFilter(filter);

  const [useLand, setUseLand] = useState();  
  function handleChangeSelectCountry(e) {
    e.preventDefault(e)
    const land = e.target.value;
    setUseLand(land);
  }

  const [useByer, setUseByer] = useState();
  function handleChangeSelectCity(e) {
    e.preventDefault();
    const byer = e.target.value;
    setUseByer(byer)
  }

  console.log(useByer, "fra usestate")
  console.log(useLand, "fra usestate")

  
  //Setter dato
  //https://www.geeksforgeeks.org/how-to-format-javascript-date-as-yyyy-mm-dd/

  const [dato, setDato] = useState(cleanDato);
  
  function cleanDato () {
    const date = new Date();
    const newDate = date.toISOString();
    const finalDate = newDate.length > 0 ? newDate.slice(0, -14) : newDate;
    return finalDate;

  }
  cleanDato();

  let imputDate = "0000-00-00";
  function handleChangeDate(e) {
    e.preventDefault();
    imputDate = e.target.value;
    console.log(imputDate, "imputDate");
  }


  const [renderFilter, setRenderFilter] = useState();
  function handleFilter() {  
    console.log(useByer, "filter byer");
    console.log(useLand, "filter land");
    console.log(imputDate);
    if (useByer == "kobenhavn" && useLand == "danmark") {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&startDateTime=${imputDate}T18:16:00Z&size=10&city=oslo&countryCode=NO&segmentName=music`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRenderFilter(data);
      })
      .catch((error) =>
        console.error("Skjedde noe feil ved fetch av load"))
    }
  }

  console.log(renderFilter, "RenderFilter");

  function RenderSiteFilter() {
    
  }  

  const [searchResult, setSearchResult] = useState();
  const [tempSearch, setTempSearch] = useState();

  //Kjell-Magne hjalp med dette <3
  const [search, setSearch] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.search.value);
    const tempSearch = e.target.search.value;
    console.log(tempSearch, "tempSearch")
    fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&keyword=${tempSearch}&locale=*`)
      .then((response) => response.json())
      .then((data) => setSearch(data))
      .catch((error) => 
        console.error("Skjedde noe feil ved fetch av søk", error)
    );
    
  }

  console.log(search, "search")

  const [venuesMapped, setVenuesMapped] = useState();

  useEffect(() => {
    console.log( "i useEffect");
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&startDateTime=${dato}T18:16:00Z&size=10&city=oslo&countryCode=NO&segmentName=${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setGenre(data);
    })
    .catch((error) =>
      console.error("Skjedde noe feil ved fetch av load"))
  }, [slug, dato]);

  const [attractionsMapped, setAttractionsMapped] = useState();

  useEffect(() => {
    if (genre?._embedded.events[0]._embedded.attractions.length > 0 && genre?._embedded.events[0]._embedded.attractions[0].images) {
      setAttractionsMapped(
        genre?._embedded.events[0]._embedded.attractions.map((attraction) =>
          <article key={attraction.id}>
            <h3>{attraction.name}</h3>
            <img src={attraction.images[0].url} alt="Image of venue" />
          </article>
        )
      )
    } else if (genre?._embedded.events[0]._embedded.attractions.length > 0) {
      setAttractionsMapped(
        genre?._embedded.events[0]._embedded.attractions.map((attraction) =>
          <article key={attraction.id}>
            <h3>{attraction.name}</h3>
            <img src="./images/ImageMissing.jpg" alt="Image for venue missing" />
          </article>
        )
      )
    } else {
      setAttractionsMapped(
        <p>There are no attractions listings for this event</p>
      )
    }
  }, [slug])

  const [eventsMapped, setEventsMapped] = useState();

  useEffect(() => {
    setEventsMapped(
      genre?._embedded.events.map((events) =>
        <article key={events.id}>
          <h3>{events.name}</h3>
          <img src={events.images[0].url} alt="Image of venue" />
        </article>
      )
    )
  }, [slug])

  useEffect(() => {
    if (genre?._embedded.events[0]._embedded.venues.length > 0 && genre?._embedded.events[0]._embedded.venues[0].images) {
      setVenuesMapped(
        genre?._embedded.events[0]._embedded.venues.map((venues) =>
          <article key={venues.id}>
            <h3>{venues.name}</h3>
            <img src={venues.images[0].url} alt="Image of venue" />
          </article>
        )
      )
    } else if (genre?._embedded.events[0]._embedded.venues) {
      setVenuesMapped(
        genre?._embedded.events[0]._embedded.venues.map((venues) =>
          <article key={venues.id}>
            <h3>{venues.name}</h3>
            <img src="./images/ImageMissing.jpg" alt="Image for venue missing" />
          </article>
        )
      )
    } else {
      setVenuesMapped(
        <p>There are no venues listing for this event</p>
      )
    }
  }, [slug])

  

  console.log(venuesMapped, "venuesMapped")

  useEffect(() => {
    setFormData(() =>
      <section className="filter-search"> 
        <h3>Filtrert søk</h3>         
        <form action={(e) => handleFilter(e)} id="filtercategory">
          <label value="dateInput" htmlFor="dato">Dato:</label>
            <input type="date" id="dato" onChange={(e) => handleChangeDate(e)} />
          <label htmlFor="countries">Land:</label>
          <select onChange={(e) => handleChangeSelectCountry(e)} id="countries" name="land">
            <option value="velg-land">Velg et land</option>
            <option value="norge">Norge</option>
            <option value="sverige">Sverige</option>
            <option value="danmark">Danmark</option>
          </select>
          <label htmlFor="byer">By:</label>
          <select onChange={(e) => handleChangeSelectCity(e)} id="byer" name="byer">
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
          <input type="search" id="search" placeholder="findings" /*onChange={handleChangeSearch}*/ />
          <button>Søk</button>
        </form>
      </section>
    )
  }, []);  

  console.log(genre, "genre")

  function translateSlug(){
    switch(slug){
      case "music":
        return (
          <>

            {formData}
            <h2>Attraksjoner</h2>
            {attractionsMapped}
            <h2>Events</h2>
            {eventsMapped}
            <h2>Spillesteder</h2>
            <section>
              {venuesMapped}
            </section>
            <h2>Test av filter-knapp</h2>
            <section>
            {renderFilter}
            </section>
          </>)
      case "sports":
        return (
          <>
            {formData}
            <h2>Attraksjoner</h2>
            {attractionsMapped}
            <h2>Events</h2>
            {eventsMapped}
            <h2>Spillesteder</h2>
            <section>
              {venuesMapped}
            </section>
          </>)
      case "theatre":
        return (
          <>
            {formData}
            <h2>Attraksjoner</h2>
            {attractionsMapped}
            <h2>Events</h2>
            {eventsMapped}
            <h2>Spillesteder</h2>
            <section>
              {venuesMapped}
            </section>
          </>)
      default:
        return "Det er ikke en gyldig kategori"
    }
    
  }

  return translateSlug()
}