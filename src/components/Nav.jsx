import { Link } from "react-router-dom"
import '../styles/nav.scss'

export default function Nav(){
    return(
        <header>
            <nav>
                <Link className="logo" to="/">BillettLyst</Link>
                <ul>
                    <li>Musikk</li>
                    <li>Sport</li>
                    <li>Teater/Show</li>
                    <li><Link to="/logginn">LoggInn</Link></li>
                </ul>
            </nav>
        </header>
    )
}