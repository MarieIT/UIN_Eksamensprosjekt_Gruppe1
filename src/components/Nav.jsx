import { Link } from "react-router-dom"
import '../styles/nav.scss'
import { useEffect, useState } from "react"

export default function Nav({setUserLoggedInn, userLoggedInn}){
    const [linkData, setLinkData] = useState({link: "/logginn", text: "Logg inn"})
    useEffect(() => {
        if(userLoggedInn == true){
            setLinkData({link: "/dashboard", text: "Dashbord"})
        }
        else{
            setLinkData({link: "/logginn", text: "Logg inn"})
        }
        console.log("linkdata", linkData)
    }, [userLoggedInn])

    return(
        <header>
            <nav>
                <Link className="logo" to="/">BillettLyst</Link>
                <ul>
                    <li>Musikk</li>
                    <li>Sport</li>
                    <li>Teater/Show</li>
                    <li><Link to={linkData.link}>{linkData.text}</Link></li>
                </ul>
            </nav>
        </header>
    )
}