import { useNavigate } from "react-router-dom"

export default function EventCard({event}){
    const navigate = useNavigate()
    function handleClick(){
        navigate(`/event/${event?.id}`)
    }

    return(
        <article onClick={handleClick} key={event?.id}>
            <img src={event?.images.filter(image => image.width > 1000)[0].url}/>
            <h3>{event?.name}</h3>
            <p>{event?.dates.start.localDate}</p>
            <p>{event?.dates.start.localTime}</p>
            <p>{event?._embedded.venues[0].city.name}</p>
            <p>{event?._embedded.venues[0].country.name}</p>
            <p>{event?._embedded.venues[0].name}</p>
        </article>
    )
}