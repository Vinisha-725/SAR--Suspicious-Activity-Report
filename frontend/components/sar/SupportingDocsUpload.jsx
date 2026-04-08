'use client';
import { useRef, useState } from 'react';
import styles from './SupportingDocsUpload.module.css';

export default function SupportingDocsUpload({ docs = [], onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files) {
    const newDocs = Array.from(files).map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: f.size,
      type: f.type,
      file: f,
    }));
    onChange([...docs, ...newDocs]);
  }

  function handleRemove(id) {
    onChange(docs.filter(d => d.id !== id));
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.sectionTitle}>Supporting Documents</h3>
      <div
        className={[styles.dropzone, dragging ? styles.dragging : ''].join(' ')}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png,.doc,.docx"
          className={styles.fileInput}
          onChange={e => handleFiles(e.target.files)}
        />
        <p className={styles.dropTitle}>Drop files here or click to browse</p>
        <p className={styles.dropSub}>PDF, Excel, CSV, JPEG, PNG, Word — max 25 MB each</p>
      </div>

      {docs.length > 0 && (
        <div className={styles.docList}>
          {docs.map((doc) => (
            <div key={doc.id} className={styles.docItem}>
              <span className={styles.docIcon}>{getIcon(doc.type)}</span>
              <div className={styles.docInfo}>
                <p className={styles.docName}>{doc.name}</p>
                <p className={styles.docSize}>{formatSize(doc.size)}</p>
              </div>
              <button className={styles.removeBtn} onClick={() => handleRemove(doc.id)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getIcon(type) {
  if (type?.includes('pdf')) return 'PDF';
  if (type?.includes('image')) return 'IMG';
  if (type?.includes('spreadsheet') || type?.includes('csv')) return 'XLS';
  return 'DOC';
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}