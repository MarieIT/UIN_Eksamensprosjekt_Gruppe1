//Guide til dropdown Hamburger-meny:
//https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb

//Guide til å lage en pil med CSS:
//https://www.w3schools.com/howto/howto_css_arrows.asp
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hamburger({ logginnMenu }) {
  const [hamburger, setHamburger] = useState()
  const [checkHamburger, setCheckHamburger] = useState();
  function toggleHamburger() {
    setCheckHamburger(!checkHamburger);
  };

  useEffect(() => {
    if (checkHamburger) {
      setHamburger(
      <div className="hamburger">
      <ul>
        <li><Link to={"/category/music"} onClick={toggleHamburger}>Musikk<i className="arrow"></i></Link></li>
        <li><Link to={"/category/sports"} onClick={toggleHamburger}>Sport<i className="arrow"></i></Link></li>
        <li><Link to={"/category/theatre"} onClick={toggleHamburger}>Teater/Show<i className="arrow"></i></Link></li>
        {logginnMenu}
      </ul>
    </div>)
    } else {
      setHamburger(
      <div className="hamburger2"></div>)
    }
  }, [checkHamburger])


  return (
    <>
    {hamburger}
    <img onClick={toggleHamburger} src="../src/images/hamburger.svg" alt="hamburger menu"/>
    </>
  )
}