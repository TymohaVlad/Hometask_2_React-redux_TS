import React, {useState} from 'react'
import { useSelector, } from 'react-redux'
import { RootState } from '../../store/store'
import { Note } from '../../store/reducers/notesSlice'

import './EditForm.css'

interface EditNoteFormProps {
  showEditForm: boolean
  onClose: (newNote: Note | null) => void;
}

function EditNoteForm({ showEditForm, onClose}: EditNoteFormProps) {
const notesDataState = useSelector((state:RootState) => state.notes.notes)
const [showForm, setShowForm] = useState(false);

function categotyOptions(){
    return notesDataState.map((note) => (
        <option key={note.id} value={note.category}>{note.category}</option>
    ))
}
function contentData(){
    return notesDataState.map((note) => (
        note.content
    ))
}
const handleCloseEditForm = () => {
  onClose(null)
}
if(!showEditForm) return null

  return (
    <div className={`modal__edit ${showEditForm ? 'active' : ''}`}>
        <div  className='modal__content-edit'>
            <h2 className='edit__modal-title'></h2>
            <section>{categotyOptions()}</section>
            <textarea value={contentData()} name="">
            </textarea>
            <div className='edit__buttons-contsiner'>
                <button className='save__btn'>Save</button>
                <button onClick={handleCloseEditForm} className='close__edit'>Close</button>
            </div>
        </div>
    </div>
  )
}

export default EditNoteForm