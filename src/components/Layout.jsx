import Nav from "./Nav";

export default function Layout({ children, linkData }) {
  return (
    <>
      <Nav linkData={linkData}/>
      <main>
        {children}
      </main>
      <footer>
        <p></p>
      </footer>
    </>
  )
}