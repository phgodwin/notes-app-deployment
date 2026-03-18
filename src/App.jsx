import { useState } from 'react';
import './App.css';

const randomColor = () => {
  const colors = ['#FFEB3B', '#FFAB91', '#C5E1A5', '#B39DDB', '#80DEEA', '#FFCC80'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function App() {
  const [notes, setNotes] = useState([]);
  const [draft, setDraft] = useState('');

  const createNote = () => {
    const text = draft.trim();
    if (!text) return;
    setNotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, color: randomColor() }
    ]);
    setDraft('');
  };

  const updateNote = (id, text) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, text } : note)));
  };

  const removeNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Sticky Notes</h1>
        <p>Create, edit, and delete notes (no database required).</p>
      </header>

      <section className="input-panel">
        <textarea
          aria-label="New note content"
          placeholder="Type your note here..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button onClick={createNote} disabled={!draft.trim()}>
          Add Sticky Note
        </button>
      </section>

      <section className="notes-grid" aria-label="Sticky notes list">
        {notes.length === 0 ? (
          <div className="empty-state">No notes yet. Add one above!</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="sticky-note" style={{ backgroundColor: note.color }}>
              <textarea
                aria-label={`Note ${note.id}`}
                value={note.text}
                onChange={(e) => updateNote(note.id, e.target.value)}
              />
              <button className="delete-btn" onClick={() => removeNote(note.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
