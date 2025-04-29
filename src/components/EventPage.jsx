

export default function EventPage({ discovery, setApi }) {

  console.log(discovery?._embedded, "console.log på EventPage")

  return (
    <>
      <h1>Event Page</h1>
      <section>
        <ul>
          {discovery?._embedded.events.map((findings) => <li key={findings.id}>{findings.name} </li>)}
        </ul>
      </section>
    </>
  )
}