import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/passwordInput";
import NavBar from "../components/NavBar";

function Login(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [response, setResponse] = useState()
    const navigate = useNavigate()

    const postUser = ()=>{
        axios.post("http://localhost:3000/api/v1/auth/login", 
            {
                email:email,
                password:password
            }
        )
        .then((response) => {
            localStorage.setItem('accessToken', response.data.token)
            localStorage.setItem('userName', response.data.user.name)
            console.log(response)
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
            setResponse(response)
        })
        .catch((error) => {
            console.log(error)
            setResponse(error)
            setTimeout(() => {
                setResponse(undefined)
            }, 2000);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.clear()
        if (!email){
            return setError("Please enter email !")
        }

        if (!password){
            return setError("Please enter password !")
        }

        postUser()
        setEmail("")
        setPassword("")
    }

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="border-2 w-80 mx-auto text-center p-5 mt-20 dark:text-white dark:bg-slate-700 dark:border-slate-900">
                <h3 className="text-lg mb-5">Login</h3>
                <form className="flex flex-wrap flex-col gap-3" onSubmit={handleSubmit}>
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
                    <button className="border-2 mx-auto w-32 hover:bg-slate-200 dark:hover:bg-slate-600 dark:border-slate-900" type="Submit">Login</button>
                    <p>Don't have an account?{" "}
                        <Link className="hover:text-blue-500 underline" to="/register">Register</Link>
                    </p>
                </form>
            </div>
            <div className={`w-36 text-center mx-auto mt-14 ${!response && 'hidden'} ${response && response.status==200 && 'bg-green-400'} ${response && !(response.status==200) && 'bg-red-400'}`}>{/*"border-2 mx-auto hidden hover:inline">*/}
                {response && response.status==200 ? 'Login Successful' : 'Login Unsuccessful'}
            </div>
        </div>
    )
}

export default Login;