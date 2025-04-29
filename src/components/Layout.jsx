import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <h1>Layout</h1>
      <nav>
        <Link to="/">Hjem</Link>
        <Link to="/event">Event Page</Link>
        <Link to="/category">Category Page</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      {children}
    </>

  )
}