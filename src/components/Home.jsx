import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Home({ discovery, setApi }) {
  const { slug, events } = useParams();
  const [pageContent, setPageContent] = useState([]);

  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=LWeeRs6C0ToGwEe5Gz96AnZM9scR2ynq')
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
    <h1>Home</h1>
    <section>
      {pageContent?.map((event) => <article key={event.id}>{event._links}</article>)}
    </section>
    </>
  )
}