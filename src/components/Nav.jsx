import { Link } from "react-router-dom"
import '../styles/nav.scss'
import { useEffect, useState } from "react"

export default function Nav({linkData}){

    return(
        <header>
            <nav>
                <Link className="logo" to="/">BillettLyst</Link>
                <ul>
                    <li>Musikk</li>
                    <li>Sport</li>
                    <li>Teater/Show</li>
                    {linkData}
                </ul>
            </nav>
        </header>
    )
}