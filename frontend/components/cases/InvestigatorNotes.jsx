'use client';
import { useState } from 'react';
import TextAreaField from '../common/TextAreaField';
import Button from '../common/Button';
import styles from './InvestigatorNotes.module.css';

export default function InvestigatorNotes({ notes = [], onAdd, loading }) {
  const [text, setText] = useState('');

  function handleSubmit() {
    if (!text.trim()) return;
    onAdd?.(text.trim());
    setText('');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.notesList}>
        {notes.length === 0 && (
          <p className={styles.empty}>No notes recorded for this case.</p>
        )}
        {notes.map((note) => (
          <div key={note.id} className={styles.note}>
            <div className={styles.noteMeta}>
              <span className={styles.noteAuthor}>{note.author}</span>
              <span className={styles.noteDate}>{fmtDatetime(note.createdAt)}</span>
            </div>
            <p className={styles.noteText}>{note.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.addNote}>
        <TextAreaField
          id="new-note"
          placeholder="Add an investigator note..."
          rows={3}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className={styles.addNoteActions}>
          <span className={styles.hint}>Notes are timestamped and cannot be edited after submission.</span>
          <Button variant="primary" size="sm" onClick={handleSubmit} loading={loading}>
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}

function fmtDatetime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}