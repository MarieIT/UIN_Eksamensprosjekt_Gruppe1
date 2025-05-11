//https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hamburger({ linkData }) {
  const [checkHamburger, setCheckHamburger] = useState();
  
  const toggleHamburger = () => {
    setCheckHamburger(!checkHamburger)
  }
  console.log(checkHamburger);

  const [hamburger, setHamburger] = useState()
  useEffect(() => {
    if (checkHamburger) {
      setHamburger(
      <div className="hamburger">
      <ul>
        <li><Link to={"/category/music"}>Musikk<i className="arrow"></i></Link></li>
        <li><Link to={"/category/sport"}>Sport<i className="arrow"></i></Link></li>
        <li><Link to={"/category/theatreshow"}>Teater/Show<i className="arrow"></i></Link></li>
        {linkData}
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