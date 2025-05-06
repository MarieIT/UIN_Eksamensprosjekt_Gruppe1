import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Home({ discovery, setApi }) {
  const { slug, events } = useParams();
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
    <section className="mainEventSection">
      {pageContent?._embedded.attractions.map((event) => 
        <article key={event.id}>
          <img src={event.images[0].url}/>
          <h2>{event.name}</h2> 
          <button className="mainEventBtn">Les mer om festivalen her!</button>
        </article>)}
    </section>
    </>
  )
}