import { Link } from "react-router-dom"
import DarkModeButton from "./DarkModeButton"
import { useNavigate } from "react-router-dom"

function NavBarDashboard({image, name}) {
    const navigate =useNavigate()

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <nav className="flex flex-row justify-between border-b-4 px-5 pt-2 dark:text-white dark:bg-slate-800 dark:border-slate-800">
            <Link to="/" className="text-3xl">
                <h1>Notes</h1>
            </Link>
            <div className="mb-1 w-1/5 flex flex-row justify-between">
                <div className="flex flex-wrap flex-row justify-center gap-1">
                    <div className="rounded-full w-9 pt-1 pl-3 bg-orange-300 dark:bg-orange-500">{name[0].toUpperCase()}</div>
                    <div className="pt-1">{name}</div>
                </div>
                <button onClick={()=>handleLogOut()} className="border-2 px-1 rounded-lg ml-5 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600">
                    LogOut
                </button>
                <DarkModeButton />
            </div>
        </nav>
    )
}

export default NavBarDashboard