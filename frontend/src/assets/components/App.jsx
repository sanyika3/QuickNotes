import Nav from './Nav';
import NoteEditor from './NoteEditor';
import NotesList from './NotesList';
import { useState } from 'react';
import { Footer } from './footer';



function App(){
    const [selectedNote, setSelectedNote] = useState(null);
    return (
        <div className="App">
            <Nav />
            <div className="AppContainer">
                <NoteEditor selectNote={selectedNote} />
                <div>
                    <NotesList onSelectNote={setSelectedNote} />
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default App;

