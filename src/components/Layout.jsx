import { Link } from "react-router-dom";
import Nav from "./Nav";
import '../styles/footer.scss';

export default function Layout({ children, linkData }) {
  return (
    <>
      <Nav linkData={linkData}/>
      <main>
        {children}
      </main>
      <footer class="footer">
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