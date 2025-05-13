import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/logginn.scss'


export default function LoggInn({setUserLoggedInn}){
    const [userLogin, setUserLogin] = useState([]);
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setUserLogin((prev) => ({ ...prev, [inputName]: inputValue}))
    }

    const handleClick = (event) => {
        event.preventDefault()
        const existingUser = JSON.parse(localStorage.getItem("user"))
        const exists = userLogin.username === existingUser.username && userLogin.password === existingUser.password
        console.log("does he exist? ", exists)
        if(exists){
            sessionStorage.setItem("loggedinn", "true")
            setUserLoggedInn(true)
            navigate("/dashboard")
        }
        else{
            setError("Brukernavn eller passord er feil")
        }
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