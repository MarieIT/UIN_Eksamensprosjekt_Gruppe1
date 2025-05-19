import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import '../styles/logginn.scss'
import { fetchLogginn } from "../../backend/sanity/services/userService";
import { useEffect } from "react";
import { useRef } from "react";


export default function LoggInn({setUserLoggedInn}){
    const [userLogin, setUserLogin] = useState([]);
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setUserLogin((prev) => ({ ...prev, [inputName]: inputValue}))
    }

    const getUserLoggin = async ()=>{
        await fetchLogginn(userLogin.username, userLogin.password)
        .then((data) => checkLogginn(data[0]))
        .catch((error)=> console.error("Noe gikk galt med fetching av logginn info", error))
    }

    function checkLogginn(userExists){
        if(userExists){
            localStorage.setItem("loggedinn", "true")
            setUserLoggedInn(true)
            localStorage.setItem("username", userLogin.username)
            navigate("/dashboard")
        }
        else{
            setError("Brukernavn eller passord er feil")
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        getUserLoggin()
    }

    return(
        <>
            <h2>LoggInn</h2>
            <form id="logginn">
                <label>
                    Brukernavn
                    <input type="text" placeholder="TomHeine..." name="username" onChange={handleChange}/>
                </label>
                <label>
                    Passord
                    <input type="password" placeholder="**********" name="password" onChange={handleChange}/>
                </label>
                <button onClick={handleClick}>Logg inn</button>
            </form>
            {error && <p className='errormessage'>{error}</p>}
        </>
    )
}