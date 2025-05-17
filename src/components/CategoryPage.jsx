import { useParams } from "react-router-dom"
import '../styles/categorypage.scss'
import { useEffect, useRef, useState } from "react"


export default function CategoryPage({}) {
  const { slug } = useParams()
  const [genre, setGenre] = useState();
  const [mapData, setMapData] = useState();
  const [content, setContent] = useState();
  const [formData, setFormData] = useState();
  const [events, setEvents] = useState();
  const [venue, setVenue] = useState();
  



  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&size=10&classificationName=${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setGenre(data);
    })
  }, [slug]);

  /*
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
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&size=10&city=oslo`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setVenue(data._embedded.events);
    })
  }, [])
  */

  /*
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
    
  }, [])
  */

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

  function handleChangeSelectCountry(e) {
    const land = e.target.value;
    console.log(land)
  }


  
  function handleChangeSelectCity(e) {
    const byer = e.target.value;
    console.log(byer)
  }

  
  function handleChangeDate(e) {
    const date = e.target.value;
    
    console.log(date)
  }
  

  function handleFilter() {
    const tempByer = byer;
    
    if (tempByer == "stockholm") {
      console.log(yeah)
    }
  }

  /*
  const [renderFilter, setRenderFilter] = useState();
  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&size=10&city=oslo`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setRenderFilter(data);
    })
  }, []);
  */  

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

  useEffect(() => {
    const genreLenght = genre?._embedded.events[0]._embedded.venues.length;
    console.log(genreLenght, "genrelenghts")
    
    function tempMap() {
      let i = 0;
      do {
          <article key={genre?._embedded.events[i]._embedded.venues[i].id}>
            <h3>{genre?._embedded.events[i]._embedded.venues[i].name}</h3>
          </article>
        i++;
        
      }
      while (i <= genreLenght)
      
    }

  }, [])

  const [venuesMapped, setVenuesMapped] = useState(tempMap);

  console.log(venuesMapped, "venuesMap")

  useEffect(() => {
    setFormData(() =>
      <section className="filter-search"> 
        <h3>Filtrert søk</h3>         
        <form action={handleFilter} id="filtercategory">
          <label>
            Dato: <input type="date" onChange={(e) => handleChangeDate(e)} />
          </label>
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
  console.log(genre?._embedded.events[0]._embedded.attractions[0].id, "ID 1")
  console.log(genre?._embedded.events[0].id, "ID 2")
  console.log(genre?._embedded.events[0]._embedded.venues[0].id, "ID 1")

  useEffect(() => {
    setMapData(() =>
        <>
          <section>
            <h3>Attractions</h3>
              {genre?._embedded.events[0]._embedded.attractions.
                map((attractions) => 
                <article key={attractions.id}>
                  <img src={attractions.images.
                    filter(image => image.width > 1000)[0].url}/>
                  <h3>{attractions.name}</h3>               
              </article>)}
          </section>
          <section>
            <h3>Arrangementer</h3>
              {genre?._embedded.events.map((events) => 
                <article key={events.id}>
                  
                  <img src={events.images[0].url}/>
                  <h3>{events.name}</h3>
                </article>
              )}
          </section>
          <section>
            <h3>Spillesteder</h3>
              {venuesMapped}
          </section>
        </>
    )
  }, [genre])

  console.log(venue, "venue")

  function translateSlug(){
    switch(slug){
      case "music":
        return (
          <>

            {formData}
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