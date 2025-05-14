import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/dashboard.scss"

export default function Dashboard({handleClick}) {
  const [user, setUser] = useState()

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
  },[])

  return (
    <>
      <h1>Dashbord</h1>
      <section id="user-info">
        <p>{user?.username}</p>
        <button onClick={handleClick}>Logg ut</button>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.explicit.bing.net%2Fth%3Fid%3DOIP.5swNd1zAKZRCz1LWWDueJwHaJ5%26pid%3DApi&f=1&ipt=9be4da7fb2566206dcf34fc5593f4b98ff2342cd36d155f441ce2aae7c72921c"/>
      </section>
      <section id= "user-purchases">
        <h3>Mine Kjøp</h3>
        <article>
          <img src="https://s1.ticketm.net/dam/a/29a/fdf8b9b8-c529-458e-bdbc-3b473975c29a_TABLET_LANDSCAPE_16_9.jpg"/>
          <h4>Findings Festival</h4>
        </article>
        <article>
          <img src="https://s1.ticketm.net/dam/a/29a/fdf8b9b8-c529-458e-bdbc-3b473975c29a_TABLET_LANDSCAPE_16_9.jpg"/>
          <h4>Findings Festival</h4>
        </article>
        <article>
          <img src="https://s1.ticketm.net/dam/a/29a/fdf8b9b8-c529-458e-bdbc-3b473975c29a_TABLET_LANDSCAPE_16_9.jpg"/>
          <h4>Findings Festival</h4>
        </article>
        <article>
          <img src="https://s1.ticketm.net/dam/a/29a/fdf8b9b8-c529-458e-bdbc-3b473975c29a_TABLET_LANDSCAPE_16_9.jpg"/>
          <h4>Findings Festival</h4>
        </article>
        <article>
          <img src="https://s1.ticketm.net/dam/a/29a/fdf8b9b8-c529-458e-bdbc-3b473975c29a_TABLET_LANDSCAPE_16_9.jpg"/>
          <h4>Findings Festival</h4>
        </article>
        <article>
          <img src="https://s1.ticketm.net/dam/a/29a/fdf8b9b8-c529-458e-bdbc-3b473975c29a_TABLET_LANDSCAPE_16_9.jpg"/>
          <h4>Findings Festival</h4>
        </article>
        {/** legge till billetter kjøpt */}  
      </section>
      <section id="user-wishlist">
        <h3>Min Ønskeliste</h3>
        <ul>
          <li><Link>Wicked</Link></li>
          <li><Link>Disturbed</Link></li>
          <li><Link>Legally Blond</Link></li>
          <li><Link>Coldplay Worldtour</Link></li>
          <li><Link>Finding Festivalen</Link></li>
          <li><Link>Golf Klubben</Link></li>
          <li><Link>Ty Dolls $ign</Link></li>
        </ul>
        {/** ønskeliste items */}  
      </section>
      <section id="user-friends">
        <h3>Venner</h3>
        <article>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2FC4E03AQETIGLvxxQ12w%2Fprofile-displayphoto-shrink_800_800%2F0%2F1625595290274%3Fe%3D2147483647%26v%3Dbeta%26t%3DG5GHUAsJj01gfxfoNXxMwn0XFcQ1WjhuLO7hbDzkPLE&f=1&nofb=1&ipt=1f2355ef308909c2b18f613cb51c6bcf722ea1c5fd4b8409a02d9363990383bf"/>
          <h4>Ann-Charlotte</h4>
          <p>Ann-Charlotte og du ønsker å dra på <span>Wacken 2026</span>, hva med å dra sammen ?</p>
        </article>
        <article>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FC4D03AQHF5QTatUEIIg%2Fprofile-displayphoto-shrink_200_200%2Fprofile-displayphoto-shrink_200_200%2F0%2F1574680082142%3Fe%3D2147483647%26v%3Dbeta%26t%3D12W8t7z6SFBnpjQCeBa2GoUgf_m_4ek8d2Uo_kI0NLE&f=1&nofb=1&ipt=05af40851593c1d12484ac08b105fc8c9dc031d65a03aaad825d467409f35e93"/>
          <h4>Ole-Edvard</h4>
          <p>Ole-Edvard og du ønsker å dra på <span>Wacken 2026</span>, hva med å dra sammen ?</p>
        </article>
        <article>
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Ozks5_LUaIIH7x9KUivYqgHaHa%26pid%3DApi&f=1&ipt=b42c5bcdfe5d5d3d1f295eabee4c3f9cddef807c872505e7300c624037b7557f"/>
          <h4>Tore Marius</h4>
          <p>Tore Marius og du ønsker å dra på <span>Wacken 2026</span>, hva med å dra sammen ?</p>
        </article>
      </section>  
    </>
  )
}