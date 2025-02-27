import axios from "axios";
import PropTypes from "prop-types";

function DeleteNote({ id }){

    const handleDelete = async () => {
        try{
        const response = await axios.delete(`http://127.0.0.1:8000/deleteNote/${id}`,{
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
            },
            withCredentials: true,
        })
        if (response.status == 200){
            window.location.reload();
        }}
        catch (error){
            console.error(error)
        }
    } 
    return <button onClick={handleDelete} type="button">
            Delete
        </button>
}

DeleteNote.propTypes = {
    id: PropTypes.string,  // Ellenőrzi, hogy az id string típusú
};


export default DeleteNote;