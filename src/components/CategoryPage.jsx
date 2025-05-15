import { useParams } from "react-router-dom"
import '../styles/categorypage.scss'
import { useEffect, useRef, useState } from "react"


export default function CategoryPage({ setSearch, handleClickSearch, searchResult}) {
  const { slug } = useParams()
  const [genre, setGenre] = useState();
  const [mapData, setMapData] = useState();
  const [content, setContent] = useState();
  const [formData, setFormData] = useState();
  



  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&startDateTime=2025-05-13T13:14:00Z&size=10&city=oslo&classificationName=${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setGenre(data);
    })  
  }, [slug]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value, "fra input")
  }

  function handleSubmit(e) {
    e.preventDefault();
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

  

  useEffect(() => {
    setMapData(() =>
        <>
          <section>
            <h3>Attractions</h3>
            {genre?._embedded.events.
              map((genreEvent) => <article key={genreEvent.id}>
                <img src={genreEvent.images.
                  filter(image => image.width > 1000)[0].url}/>
                <h3>{genreEvent.name}</h3>
                <p>{genreEvent.dates.start.localDate}</p>
                <p>{genreEvent.dates.start.localTime}</p>
                <p>{genreEvent._embedded.venues[0].city.name}</p>
                <p>{genreEvent._embedded.venues[0].country.name}</p>
                <p>{genreEvent._embedded.venues[0].name}</p>
            </article>)}
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
      case "sport":
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