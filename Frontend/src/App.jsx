import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Landing from "./pages/landing"
import Dashboard from "./pages/Dashboard"
import { useState } from "react"
import CreateNote from './pages/CreateNote'
import UpdateNote from './pages/UpdateNote'

export const Context = React.createContext()

const router = (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/updatenote" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
)

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <main className={`${darkMode && 'dark bg-slate-600'} h-screen w-screen`}>
      <Context.Provider value={[darkMode, setDarkMode]}>
        {router}
      </Context.Provider>
    </main>
  )
}

export default App