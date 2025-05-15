import { Link } from "react-router-dom"
import '../styles/eventcard.scss'
import filledStar from '../assets/StarFilled.svg'
import hollowStar from '../assets/StarHollow.svg'

export default function EventCard({event, isWishlisted, addToWishlist, removeWishlist}){

    const handleClick = (e) =>{
        e.preventDefault()
        isWishlisted ? removeWishlist(event) : addToWishlist(event)
    }

    return(
        <article key={event?.id} className="event-card">
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
                    <button onClick={handleClick}>Legg til i ønskeliste</button>
                </li>
            </ul>
            {isWishlisted ? <img className="star" src={filledStar}/>: <img className="star" src={hollowStar}/>}
        </article>
    )
}