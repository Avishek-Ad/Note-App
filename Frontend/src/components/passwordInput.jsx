import { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

function PasswordInput({password, setPassword, setError}){
    const [isShowPassword, setIsShowPassword] = useState(false)
    return(
        <div className="px-1 border-2 rounded-sm mx-auto flex justify-center dark:bg-slate-500 dark:border-slate-900">
            <input
                className="outline-none dark:bg-slate-500"
                type= {isShowPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>
                    {
                        setPassword(e.target.value)
                        setError('')
                    }}
                placeholder="Password"/>
            <div className="my-auto" onClick={()=>setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? <PiEye /> : <PiEyeClosed />}
            </div>
        </div>
    )
}

export default PasswordInput;