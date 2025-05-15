import { Link } from "react-router-dom"
import '../styles/eventcard.scss'

export default function EventCard({event}){

    return(
        <article key={event?.id}>
            <img src={event?.images.filter(image => image.width > 1000)[0].url}/>
            <h3>{event?.name}</h3>
            <ul className="event-info">
                <li>{event?.dates.start.localDate}</li>
                <li>{event?.dates.start.localTime}</li>
                <li>{event?._embedded.venues[0].city.name}</li>
                <li>{event?._embedded.venues[0].country.name}</li>
                <li>{event?._embedded.venues[0].name}</li>
            </ul>
            <ul className="event-menu">
                <li>
                    <Link to={event?.url}>Kjøp</Link>
                </li>
                <li>
                    <button>Legg til i ønskeliste</button>
                </li>
            </ul>
        </article>
    )
}