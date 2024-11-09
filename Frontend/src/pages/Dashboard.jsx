import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateNoteButton from "../components/CreateNoteButton";
import NavBarDashboard from "../components/NavBarDashboard";
import NoteCard from "../components/NoteCard";
import FetchError from "../components/FetchError";

function Dashboard(){
    const [notes, setNotes] = useState([])
    const [serverError, setServerError] = useState(true)
    const navigate = useNavigate()

    const getNotes = () => {
        axios.get("http://localhost:3000/api/v1/notes", 
            {headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }}
        )
        .then((response) => {
            console.log(response)
            setNotes(response.data.notes)
            setServerError(false)
        })
        .catch((error) => {
            console.log(error)
            setServerError(true)
        })
    }

    const deleteNote = (id) => {
        axios.delete(`http://localhost:3000/api/v1/notes/${id}`, 
            {headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }}
        )
        .then((response) => {
            console.log(response)
            location.reload(true)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getNotes()
    }, [])

    const updateNote = (title, description, tags, id) => {
        navigate('/updatenote', {state:{titles:title, descriptions:description, tagss:tags, id:id}})
    }

    return (
        <>
        <NavBarDashboard name={localStorage.getItem('userName')}/>
        <div className="flex flex-wrap justify-around gap-5 mt-5 mx-40">
            {notes && notes.map(({title, description, tag, _id, createdAt})=>(
                <NoteCard
                key={_id} 
                title = {title} 
                description= {description}
                tags={tag}
                id={_id}
                createdAt={createdAt}
                deleteNote={deleteNote}
                updateNote={updateNote}/>
            ))}
        </div>
        {serverError && <FetchError />}
        <CreateNoteButton />
        </>
    )
}

export default Dashboard;