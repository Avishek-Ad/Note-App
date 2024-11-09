import { Link } from "react-router-dom"
import { IoMdCreate } from "react-icons/io";

function CreateNoteButton() {

  return (
    <Link to="/createnote">
      <div className="p-3 rounded-2xl border-4 border-emerald-500 bg-emerald-400 hover:bg-emerald-500 inline-block fixed right-14 bottom-14">
          <IoMdCreate className="text-2xl"/>
      </div>
    </Link>
  )
}

export default CreateNoteButton