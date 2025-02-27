import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import "../styles/NoteEditor.css"; 
import axios from "axios";
import useAuth from "./useAuth";
import PropTypes from "prop-types";

const NoteEditor = ({ selectNote }) => {
  const [content, setContent] = useState("<p>Write your note here...</p>");
  const [priority,setPriority] = useState(1);
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [message,setMessage] = useState("");
  const isLoggedIn = useAuth();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (selectNote) {
      setTitle(selectNote.title);
      setCategory(selectNote.category);
      setPriority(selectNote.priority);
      setContent(selectNote.content); 
      if (editor) {
        editor.commands.setContent(selectNote.content);  
      }
    }
  }, [selectNote, editor]);

  

  if (!editor) return null;

 
 
 
  const handleSave = async () => {
    try {
      const endpoint = selectNote ? "http://127.0.0.1:8000/addNote" : "http://127.0.0.1:8000/addNote";
      const method = selectNote ? "PUT" : "POST";  
  
      const response = await axios({
        method: method,
        url: endpoint,
        data: {
          id: selectNote ? selectNote.id : undefined,  
          priority,
          title,
          category,
          content,
        },
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)[1],
        },
        withCredentials: true,
      });
  
      const data = response.data;
      if (data && response.status === 200 || response.status === 201) {
        setMessage(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Hiba történt!");
    }
  };

  return (
    <div className="editorContainer">
        <div className="editor">
            {/* Toolbar */}
            <div className="toolbar">
                <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
                <button onClick={() => editor.chain().focus().setColor("#ff0000").run()}>🔴</button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()}>🔶</button>
                <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>⬅️</button>
                <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>⏺️</button>
                <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>➡️</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>Ordered List</button>
            </div>

            {/* Editor */}
            <div className="editor-content">
                <EditorContent editor={editor} />
            </div>

            <div className="input-group">
                <label htmlFor="title">
                    <input 
                    type="text" 
                    name="title"
                    placeholder="Title" 
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}} 
                    required
                    />
                </label></div>
                <div className="input-group">
                <label htmlFor="category">
                    <input 
                    type="text" 
                    name="category" 
                    placeholder="Category"
                    id="category"
                    value={category}
                    onChange={(e) => {setCategory(e.target.value)}} 
                    required
                    />
                </label></div>
                
                <label htmlFor="priority">
                    <select
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    >
                      <option value={1}>Low</option>
                      <option value={2}>Medium</option>
                      <option value={3}>High</option>
                    </select>
                </label><br />
            


            {/* Mentés */}
            {isLoggedIn ? (<button onClick={handleSave} className="save-btn">Save</button>): (<p className="editorParagraph">You need to log in to save the note!</p>)}
            {message ? ( <p className="editorParagraph"> {message} </p>): null}
        </div>
    </div>
  );
};

NoteEditor.propTypes = {
  selectNote: PropTypes.object,
};

export default NoteEditor;
