import "../styles/NotesSearch.css";
import { useState } from "react";
import PropTypes from "prop-types";

function NotesSearch({ onSearch }) {
    const [search, setSearch] = useState("");

    // Az onSearch meghívása minden változáskor
    onSearch(search);

    return (
        <div className="search-container">
            <input 
                className="searcher"
                type="search" 
                name="search" 
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
            />
        </div>
    );
}

NotesSearch.propTypes = {
    onSearch: PropTypes.func, // onSelectNote egy függvény
  };


export default NotesSearch;
