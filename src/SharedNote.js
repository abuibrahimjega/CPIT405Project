import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import './Form.css';

function SharedNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, 'notes', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setNote(docSnap.data());
      } else {
        setNote(null);
      }
    };
    fetchNote();
  }, [id]);

  return (
    <div className="container">
      <img src="/logo192.png" alt="Logo" style={{ width: '60px', marginBottom: '10px' }} />
      <h2>StudyBuddy Shared Note</h2>
      {note ? (
        <div>
          <p><strong>Note:</strong> {note.text}</p>
        </div>
      ) : (
        <p>Note not found or deleted.</p>
      )}
    </div>
  );
}

export default SharedNote;
