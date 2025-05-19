import { Link } from "react-router-dom"
import '../styles/nav.scss'
import { useEffect, useState } from "react"
import Hamburger from "./Hamburger"

export default function Nav({logginnMenu}){

    return(
        <header>
            <nav>
                <div className="header-mobil">
                    <Link className="logo" to="/">BillettLyst</Link>
                    <Hamburger linkData={logginnMenu} />
                </div>
                <div className="header-desktop">
                    <Link className="logo" to="/">BillettLyst</Link>
                    <ul>
                        <li><Link to={"/category/music"}>Musikk</Link></li>
                        <li><Link to={"/category/sports"}>Sport</Link></li>
                        <li><Link to={"/category/theatre"}>Teater/Show</Link></li>
                    </ul>
                    <ul id="logginn-menu">
                        {logginnMenu}
                    </ul>
                </div>
            </nav>
        </header>
    )
}