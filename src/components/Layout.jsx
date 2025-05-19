import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Layout({ children, logginnMenu }) {
  return (
    <>
      <Nav logginnMenu={logginnMenu}/>
      <main>
        {children}
      </main>
      <footer id="footer">
        <Link to={"https://developer.ticketmaster.com/api-explorer/v2/"}>Ticketmaster API Explorer V2.0</Link>
      </footer>
    </>
  )
}