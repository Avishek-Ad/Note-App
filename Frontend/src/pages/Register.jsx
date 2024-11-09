import { useState } from "react";
import axios from "axios";
import PasswordInput from "../components/passwordInput";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

function Register(){
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const [msg, setMsg] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.clear()
        if(!userName){
            return setError("Please enter user name !")
        }

        if (!email){
            return setError("Please enter email !")
        }

        if (!password){
            return setError("Please enter password !")
        }

        postUser()
        setUserName("")
        setEmail("")
        setPassword("")
    }

    const postUser = ()=>{
        axios.post("note-app-api-psi.vercel.app/api/v1/auth/register", 
            {
                name:userName,
                email:email,
                password:password
            }
        )
        .then((response) => {
            console.log(response)
            setResponse(response)
            setMsg('Registration Successful')
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        })
        .catch((error) => {
            setResponse(error)
            console.log(error)
            if (error.status==400)
                setMsg('Email Already exists')
            else
                setMsg('Registration Unsuccessful')
            setTimeout(() => {
                setResponse(undefined)
            }, 2000);
        })
    }

    return (
    <div className="flex flex-col">
        <NavBar />
        <div className="border-2 w-80 mx-auto text-center p-5 mt-20 dark:text-white dark:bg-slate-700 dark:border-slate-900">
            <h3 className="text-lg mb-5">Register</h3>
            <form className="flex flex-wrap flex-col gap-3" onSubmit={handleSubmit}>
                <label>
                    <input
                    className="px-1 outline-none border-2 rounded-sm w-52 dark:bg-slate-500 dark:border-slate-900"
                    type="text" 
                    value={userName} 
                    onChange={(e)=>
                        {
                            setUserName(e.target.value)
                            setError('')
                        }} 
                    placeholder="userName"/>
                </label>

                <label>
                    <input
                    className="px-1 outline-none border-2 rounded-sm w-52 dark:bg-slate-500 dark:border-slate-900"
                    type="email" 
                    value={email} 
                    onChange={(e)=>
                        {
                            setEmail(e.target.value)
                            setError('')
                        }} 
                    placeholder="Email"/>
                </label>
                
                <PasswordInput password={password} setPassword={setPassword} setError={setError}/>
                
                <p className="text-red-500">{error}</p>
                <button className="border-2 mx-auto w-32 hover:bg-slate-200 dark:hover:bg-slate-600 dark:border-slate-900" type="Submit">Register</button>
                <p>Already have an account?{" "}
                    <Link className="hover:text-blue-500 underline" to="/login">Login</Link>
                </p>
            </form>
        </div>
        <div className={`w-40 text-center mx-auto mt-14 ${!response && 'hidden'} ${response && response.status==201 && 'bg-green-400'} ${response && !(response.status==201) && 'bg-red-400'}`}>{/*"border-2 mx-auto hidden hover:inline">*/}
            {msg}
        </div>
    </div>
    )
}

export default Register;