import { Link } from "react-router-dom";
import Nav from "./Nav";
import '../styles/footer.scss';

export default function Layout({ children, logginnMenu }) {
  return (
    <>
      <Nav logginnMenu={logginnMenu}/>
      <main>
        {children}
      </main>
      <footer className="footer">
        <p>© 2025 Billettlyst. Alle rettigheter reservert.</p>
        <p>
          Data levert av 
          <a href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/">
            Ticketmaster API
          </a>
        </p>
      </footer>
    </>
  )
}