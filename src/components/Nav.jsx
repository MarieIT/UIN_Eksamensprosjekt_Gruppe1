import { Link } from "react-router-dom"
import '../styles/nav.scss'
import { useEffect, useState } from "react"

export default function Nav({linkData}){

    return(
        <header>
            <nav>
                <Link className="logo" to="/">BillettLyst</Link>
                <ul>
                    <li><Link to={"/category/music"}>Musikk</Link></li>
                    <li><Link to={"/category/sport"}>Sport</Link></li>
                    <li><Link to={"/category/theatreshow"}>Teater/Show</Link></li>
                    {linkData}
                </ul>
            </nav>
        </header>
    )
}