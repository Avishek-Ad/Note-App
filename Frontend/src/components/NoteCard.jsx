import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function NoteCard({title, description, tags, id, createdAt, deleteNote, updateNote}){    

    return (
        <div className="border-2 w-80 rounded-md px-2 dark:bg-slate-700 dark:border-slate-800 dark:text-white">
            <div className="text-2xl border-b-2 dark:border-slate-800">
                {title[0].toUpperCase()}{title.slice(1)}
            </div>
            <div className="text-xl mt-2">
                {description[0].toUpperCase()}{description.slice(1)}
            </div>
            <div className="text-lg my-3">
                {tags && tags.map((tag)=>(
                    <span>{'#'}{tag} {" "}</span>
                ))}
            </div>
            
            <footer className="flex justify-between">
                <p className="text-xs my-auto">
                    Created at : {createdAt.split('T')[0]}
                </p>
                <div className="text-right">
                    <button onClick={()=>updateNote(title, description, tags, id)} className="mr-2">
                        <FaEdit />
                    </button>
                    <button onClick={()=>deleteNote(id)}>
                        <MdDelete />
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default NoteCard;