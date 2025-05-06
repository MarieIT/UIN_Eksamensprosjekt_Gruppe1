

export default function EventPage({ discovery, setApi }) {

  console.log(discovery?._embedded.events[0]._embedded.attractions, "console.log på EventPage")

  return (
    <>
      <h1>Event Page</h1>
      <section>
        <ul>
          {discovery?._embedded.events[0]._embedded.attractions.map((findings) => <li key={findings.id}>{findings.name} {findings.images[0].url}</li>)}
        </ul>
      </section>
    </>
  )
}