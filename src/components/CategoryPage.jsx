import { useParams } from "react-router-dom"
import '../styles/categorypage.scss'
import { useEffect, useState } from "react"

export default function CategoryPage() {
  const { slug } = useParams()
  const [genre, setGenre] = useState();
  const [mapData, setMapData] = useState();
  const [content, setContent] = useState();



  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq&locale=*&startDateTime=2025-05-13T13:14:00Z&size=10&city=oslo&classificationName=${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data, "setGenre");
      setGenre(data);
    })  
  }, [slug]);

  useEffect(() => {
    setMapData(() =>
          <>
          <section>          
            <form id="filtercategory" action="/action_page.php">
              <label for="dato">Dato:</label>
              <input type="date" id="dato-felt" name="dato" />
              <label for="countries">Land:</label>
              <select id="countries" name="land">
                <option value="velg-land">Velg et land</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
              </select>
              <label for="byer">By:</label>
              <select id="countries" name="land">
                <option value="velg-by">Velg en by</option>
                <option value="oslo">Oslo</option>
                <option value="stockholm">Stockholm</option>
                <option value="kobenhavn">København</option>
              </select>
              <button type="submit" name="filtrer">Filtrer</button>
            </form>          
          </section>
          <section>
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


  useEffect(() => {
    setContent(
      <>
        <section>
          <h2>hello</h2>
        </section>
        <section>
          {mapData}
        </section>
      </>
    )
  }, [mapData])

  console.log(mapData, "content")

  function translateSlug(){
    switch(slug){
      case "music":
        return (
          <>
            {mapData}           
          </>)
      case "sport":
        return (
          <>
            {mapData}
          </>)
      case "theatre":
        return (
          <>
            {mapData}
          </>)
      default:
        return "Det er ikke en gyldig kategori"
    }
    
  }

  return translateSlug()
}