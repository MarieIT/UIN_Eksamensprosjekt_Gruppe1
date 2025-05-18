import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/logginn.scss'
import { fetchLogginn } from "../../backend/sanity/services/userService";


export default function LoggInn({setUserLoggedInn}){
    const [userLogin, setUserLogin] = useState([]);
    const [response, setResponse] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setUserLogin((prev) => ({ ...prev, [inputName]: inputValue}))
    }

    const getUserLoggin = async ()=>{
        const data = fetchLogginn(userLogin.username, userLogin.password)
        return data
    }

    const handleClick = async(event) => {
        event.preventDefault()
        await setResponse(getUserLoggin())
        if(response){
            sessionStorage.setItem("loggedinn", "true")
            setUserLoggedInn(true)
            localStorage.setItem("username", userLogin.username)
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