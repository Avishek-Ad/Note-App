import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateNote = () => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [tag, setTag] = useState(null)
  const [tags, setTags] = useState([])
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleAdd = (e) => {
    e.preventDefault()
    if (tag){
      setTags([...tags, tag])
    }
    setTag("")
  }

  const postData = () => {
    axios.post("https://note-app-api-psi.vercel.app/api/v1/notes",
      {
        title:title,
        description:description,
        tag:tags
      },
      {headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }}
    )
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!title){
        return setError("Please enter title !")
    }

    if (!description){
        return setError("Please enter description !")
    }
    // send data  to database
    postData()
    // go back to dashboard
    navigate('/dashboard')
  }

  return (
    <>
    <div className="m-auto border border-gray-300 rounded-md w-96 h-auto py-10 text-center relative top-20 dark:text-white dark:bg-slate-700 dark:border-slate-900">
      <h1 className="text-2xl mb-5">New Note</h1>
      <form className="flex flex-col gap-5 justify-start"onSubmit={(e) => handleFormSubmit(e)}>
        <label className="">
          Title :{" "}
          <input  className="px-1 border-2 outline-none dark:bg-slate-500 dark:border-slate-900" type="text" placeholder="title" value={title} onChange={(e)=>{
            setTitle(e.target.value)
            setError('')
          }}/>
        </label>
        <label className="">
          Description :{" "}
          <textarea className="w-52 h-24 px-1 border-2 outline-none dark:bg-slate-500 dark:border-slate-900" placeholder="description..." onChange={(e)=>{
            setDescription(e.target.value)
            setError('')
          }}>{description}</textarea>
        </label>
        <label className="">
          Tags :{" "}
          <div className="inline">
            <input className="w-20 mr-1 px-1 border-2 outline-none dark:bg-slate-500 dark:border-slate-900" placeholder="tag" type="text" value={tag} onChange={(e)=>{
              setTag(e.target.value)
              setError('')
              }} />
            <button className="dark:bg-slate-800 px-2" onClick={(e) => handleAdd(e)}>add</button>
          </div>
          <ul className="w-56 mx-auto">
            {tags.map((tag) => (
              <li className="inline" id={Math.floor(Math.random()*10)}>#{tag}{' '}</li>
            ))}
          </ul>
        </label>
        <p className="text-red-500">{error}</p>
        <button type="Submit" className="mx-auto px-5 mt-5 border-2 rounded-md inline w-fit hover:bg-slate-200 dark:hover:bg-slate-600 dark:border-slate-900">Create</button>
      </form>
    </div>
    </>
  )
}

export default CreateNote;