import { Link } from "react-router-dom"
import DarkModeButton from "./DarkModeButton"

function NavBar() {
    return (
        <nav className="border-b-2 dark:border-slate-800 px-5 flex flex-wrap justify-around dark:bg-slate-800 dark:text-white">
            <Link to="/" className="text-3xl pt-2 w-3/4">
                <h1>Notes</h1>
            </Link>
            <div className="text-lg w-1/4 flex flex-row-reverse gap-5 p-2">
                <DarkModeButton />
                <Link to="/login" className="border-2 px-1 hover:bg-slate-200 rounded-md dark:border-slate-600 dark:hover:bg-slate-600 dark:text-white dark:bg-slate-700">
                    Login
                </Link>
                <Link to="/register" className="border-2 px-1 hover:bg-slate-200 rounded-md dark:border-slate-600 dark:hover:bg-slate-600 dark:text-white dark:bg-slate-700">
                    Register
                </Link>
            </div>
        </nav>
    )
}

export default NavBar