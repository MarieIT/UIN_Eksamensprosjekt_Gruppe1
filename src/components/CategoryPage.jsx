import { useParams } from "react-router-dom"

export default function CategoryPage() {
  const { slug } = useParams()

  function translateSlug(){
    switch(slug){
      case "music":
        return "Musikk"
      case "sport":
        return "Sport"
      case "theatreshow":
        return "Teater/Show"
      default:
        return "Det er ikke en gyldig categori"
    }
    
  }

  return <h1>{translateSlug()}</h1>
}