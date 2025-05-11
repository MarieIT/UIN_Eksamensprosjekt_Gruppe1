//https://khuang159.medium.com/creating-a-hamburger-menu-in-react-f22e5ae442cb

import { Link } from "react-router-dom";

export default function Hamburger({ linkData }) {
  return (
    <>
    <img src="../src/images/hamburger.svg"/>
    <div className="hamburger">
      <ul>
        <li><Link to={"/category/music"}>Musikk</Link></li>
        <li><Link to={"/category/sport"}>Sport</Link></li>
        <li><Link to={"/category/theatreshow"}>Teater/Show</Link></li>
        {linkData}
      </ul>    
    </div>
    </>
  )
}