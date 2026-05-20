/* Props: file (File|null), onFileChange (fn) */
import React, { useRef, useState } from 'react';
import { BsCloudUploadFill, BsFileEarmarkFill, BsXCircleFill, BsFiletypePdf, BsFiletypeDocx, BsFiletypeXlsx } from 'react-icons/bs';
import { validateFile, ACCEPTED_MIME_TYPES } from '../../utils/fileValidation';
import { FilePreview } from './FilePreview';
import '../../styles/questionnaire.css';

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function FileTypeIcon({ name }) {
  const ext = name?.split('.').pop()?.toLowerCase();
  if (ext === 'pdf')  return <BsFiletypePdf size={18} style={{ color: '#dc2626' }} />;
  if (ext === 'docx') return <BsFiletypeDocx size={18} style={{ color: '#2563eb' }} />;
  if (ext === 'xlsx') return <BsFiletypeXlsx size={18} style={{ color: '#059669' }} />;
  return <BsFileEarmarkFill size={18} style={{ color: '#4f46e5' }} />;
}

export function FileDropzone({ file, onFileChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  function handleFile(f) {
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setError(null);
    onFileChange(f);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  return (
    <div>
      {file ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          border: '1.5px solid #a5b4fc',
          borderRadius: 10,
          background: '#f5f3ff',
        }}>
          <FileTypeIcon name={file.name} />
          <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {file.name}
          </span>
          <span style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0 }}>
            {(file.size / 1024 / 1024).toFixed(1)} MB
          </span>
          <button
            onClick={() => onFileChange(null)}
            title="Remove file"
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <BsXCircleFill size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`file-dropzone${dragging ? ' file-dropzone--active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="file-dropzone__icon">
            <BsCloudUploadFill />
          </div>
          <div className="file-dropzone__label">
            Drag & drop or{' '}
            <span style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'underline' }}>
              browse files
            </span>
          </div>
          <div className="file-dropzone__hint">PDF, DOCX, XLSX · max 50 MB</div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_MIME_TYPES}
            className="d-none"
            onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
          />
        </div>
      )}
      {error && (
        <div style={{
          fontSize: 12, color: '#dc2626',
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: 6,
          padding: '5px 10px',
          marginTop: 6,
        }}>
          {error}
        </div>
      )}
      {file?.type === XLSX_MIME && <FilePreview file={file} />}
    </div>
  );
}
