import { Link } from "react-router-dom"

export default function AttractionCard({event}){
    return(
        <article className="article-attractions">
            <h2>{event?.name}</h2>
            <img src={event?.images.filter(image => image.width < 600)[0].url}/>
            <Link to={`/event/${event?.id}`} className="mainEventBtn">Les mer om {event?.name} her!</Link>
        </article>
    )
}