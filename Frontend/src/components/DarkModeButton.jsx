import React, { useContext } from 'react'
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import {Context} from "../App"

const DarkModeButton = () => {
    const [darkMode, setDarkMode] = useContext(Context)
  return (
    <button
        className='border-2 rounded-lg p-2 hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-600 dark:text-white dark:bg-slate-700'
        onClick={()=>setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>
  )
}

export default DarkModeButton