import Nav from "./Nav";

export default function Layout({ children, setUserLoggedInn, userLoggedInn }) {
  return (
    <>
      <Nav userLoggedInn={userLoggedInn} setUserLoggedInn={setUserLoggedInn}/>
      <main>
        {children}
      </main>
    </>
  )
}