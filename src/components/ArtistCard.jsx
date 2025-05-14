export default function ArtistCard({artist}){

    return(
        <article>
            <h2>{artist.name}</h2>
            <img src={artist.images[0].url}/>
        </article>
    )
}