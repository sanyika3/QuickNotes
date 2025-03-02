import "../styles/NotesList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NotesSearch from "./NotesSearch";
import DeleteNote from "./DeleteNote";
import PropTypes from "prop-types";
import useAuth from "./useAuth";


function NotesList({ selectedCategory, onSelectNote }){
    const [notes,setNote] = useState([])
    const [search,setSearch] = useState([])
    const isLoggedIn = useAuth();


    useEffect(() => {
        try{
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:8000/getAllNotes");
            setNote(response.data)
            console.log("Fetch:",response.data)
        }
        fetchData();
        }catch(error){
            console.error("Error:", error)
        }
    },[])

    const handleSearch = (search) =>{
            setSearch(search);
    };

    const filtered = notes.filter((note) => {
        let matchedTitle =  note.title.toLowerCase().includes(search.toLowerCase());
        let filteredNotes = selectedCategory ? note.category === selectedCategory : notes;
        return matchedTitle && filteredNotes;
    });

    return (
        <div className="NotesListContainer">
            <NotesSearch onSearch={handleSearch} />
            <div className="NotesGrid">
                {filtered.map((note) => {
                    const formattedDate = new Date(note.updated_at).toLocaleString("hu-HU", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <div
                            key={note.id}
                            className={`NotesItem ${note.priority === 1 ? 'low-priority' : note.priority === 2 ? 'medium-priority' : 'high-priority'}`}
                            onClick={() => {
                                console.log("Clicked note:", note);
                                onSelectNote(note);
                            }}
                        >
                            <h2>{note.title}</h2>
                            <p><strong>Written by: </strong>{note.user.username}</p>
                            <p><strong>Category: </strong>{note.category}</p>
                            <strong>Updated: </strong>{formattedDate}

                            {isLoggedIn ? (<p><DeleteNote id={note.id} /></p>) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

NotesList.propTypes = {
    selectedCategory: PropTypes.string, // Ha kategória egy string, pl. 'work' vagy 'personal'
    onSelectNote: PropTypes.func, // onSelectNote egy függvény
  };

export default NotesList;