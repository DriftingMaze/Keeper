import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import * as noteService from "../services/noteService";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await noteService.getNotes();
        setNotes(notesData);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  async function addNote(newNote) {
    try {
      const savedNote = await noteService.addNote(newNote);
      setNotes(prevNotes => [...prevNotes, savedNote]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  }

  async function deleteNote(id) {
    try {
      await noteService.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  return (
    <div>
      <CreateArea onAdd={addNote} />
      <div className="notes-container">
        {notes.map(noteItem => (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/notes" 
              element={
                <PrivateRoute>
                  <NotesPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;