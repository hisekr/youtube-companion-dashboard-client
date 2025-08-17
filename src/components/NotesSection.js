'use client';
import { useState } from 'react';
import Button from './Button';

export default function NotesSection({ notes, onAddNote, onSearch }) {
  const [noteText, setNoteText] = useState('');
  const [search, setSearch] = useState('');

  const handleAddNote = async () => {
    await onAddNote(noteText);
    setNoteText('');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Notes</h2>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Note text"
      />
      <Button onClick={handleAddNote} disabled={!noteText}>Add Note</Button>
      <input
        value={search}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-2"
        placeholder="Search notes"
      />
      <ul className="mt-2 h-64 overflow-y-auto border rounded p-2">
        {notes.map((note) => (
          <li key={note.id} className="border-b py-2">
            {note.text} - <span className="text-sm text-gray-600">{new Date(note.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}