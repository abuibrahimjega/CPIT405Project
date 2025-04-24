import React, { useState, useEffect } from 'react';
import './Form.css';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

function Dashboard() {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleAddOrUpdateNote = async (e) => {
    e.preventDefault();
    if (note.trim() === '') return;

    try {
      if (editingId) {
        await updateDoc(doc(db, 'notes', editingId), { text: note });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'notes'), {
          uid: user.uid,
          text: note,
          timestamp: Date.now()
        });
      }
      setNote('');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEditNote = (noteId, currentText) => {
    setEditingId(noteId);
    setNote(currentText);
  };

  const handleDeleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'notes'), where('uid', '==', user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData);
    });
    return () => unsub();
  }, [user]);

  return (
    <div className="container">
      <img src="/logo192.png" alt="Logo" style={{ width: '60px', marginBottom: '10px' }} />
      <h2>Welcome to StudyBuddy 🎓</h2>
      <p>Your Personal Study Notes</p>

      <form onSubmit={handleAddOrUpdateNote}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your study note"
        />
        <button type="submit">{editingId ? 'Update Note' : 'Add Note'}</button>
      </form>

      <ul style={{ textAlign: 'left', padding: 0, marginTop: '20px' }}>
  {notes.map((n) => (
    <li key={n.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
      📌 {n.text}
      <button
        onClick={() => handleEditNote(n.id, n.text)}
        style={{ marginLeft: '10px', background: '#ffc107', fontSize: '12px' }}
      >
        Edit
      </button>
      <button
        onClick={() => handleDeleteNote(n.id)}
        style={{ marginLeft: '6px', background: '#dc3545', color: 'white', fontSize: '12px' }}
      >
        Delete
      </button>
      <button
  onClick={() => {
    const shareURL = `${window.location.origin}/shared/${n.id}`;
    navigator.clipboard.writeText(shareURL)
      .then(() => alert("Link copied to clipboard! 📋"))
      .catch(() => alert("Failed to copy. Try again."));
  }}
  style={{
    marginLeft: '6px',
    background: '#28a745',
    color: 'white',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  }}
>
  Share
</button>
  </li>
  ))}
</ul>


      <hr style={{ marginTop: '30px' }} />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Dashboard;
