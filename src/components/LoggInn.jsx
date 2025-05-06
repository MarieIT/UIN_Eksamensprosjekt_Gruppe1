import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoggInn({ setUserLoggedInn }){
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
        const exists = userLogin.username === "TomHeine" && userLogin.password === "123"
        console.log(exists)
        exists ? setUserLoggedInn(true) : setError("Brukernavn eller passord er feil")
        navigate("/dashboard")
    }
    return(
        <>
            <h2>LoggInn</h2>
            <form>
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
            {error}
        </>
    )
}