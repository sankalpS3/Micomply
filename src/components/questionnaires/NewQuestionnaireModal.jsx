/* Props: isOpen (bool), onClose (fn), onSubmit (fn) */
import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { FileDropzone } from '../upload/FileDropzone';
import { WebPortalInput } from '../upload/WebPortalInput';
import { BsCloudUpload, BsGlobe2 } from 'react-icons/bs';

export function NewQuestionnaireModal({ isOpen, onClose, onSubmit }) {
  const [file, setFile] = useState(null);
  const [portalUrl, setPortalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = !!file || portalUrl.trim().startsWith('http');

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ file, portalUrl });
      setFile(null);
      setPortalUrl('');
      onClose();
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setFile(null);
    setPortalUrl('');
    setError(null);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Autofill a new questionnaire" size="lg">
      <p style={{ fontSize: 13, color: '#64748b', marginTop: -4, marginBottom: 20, lineHeight: 1.6 }}>
        Upload a questionnaire file or paste a web portal link. Our AI will automatically answer each question using your knowledge base.
      </p>

      {/* Option 1 — file */}
      <OptionCard
        number="1"
        icon={<BsCloudUpload size={17} />}
        label="Upload a file"
        active={!!file}
      >
        <FileDropzone
          file={file}
          onFileChange={(f) => { setFile(f); if (f) setPortalUrl(''); }}
        />
      </OptionCard>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '14px 0' }}>
        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em' }}>OR</span>
        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
      </div>

      {/* Option 2 — portal */}
      <OptionCard
        number="2"
        icon={<BsGlobe2 size={17} />}
        label="Submit a web portal"
        active={!!portalUrl}
      >
        <WebPortalInput
          value={portalUrl}
          onChange={(v) => { setPortalUrl(v); if (v) setFile(null); }}
        />
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 7, lineHeight: 1.5 }}>
          Paste a vendor portal link (e.g. OneTrust, Drata). Used only for autofill — never stored.
        </div>
      </OptionCard>

      {/* Error */}
      {error && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 13,
          color: '#991b1b',
          marginTop: 14,
        }}>
          {error}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 22 }}>
        <CancelButton onClick={handleClose} disabled={loading} />
        <SubmitButton canSubmit={canSubmit} loading={loading} onClick={handleSubmit} />
      </div>
    </Modal>
  );
}

function OptionCard({ number, icon, label, active, children }) {
  return (
    <div style={{
      border: `1.5px solid ${active ? '#a5b4fc' : '#e2e8f0'}`,
      borderRadius: 12,
      padding: 16,
      background: active ? '#f5f3ff' : '#fafafa',
      transition: 'border-color 0.14s, background 0.14s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 22, height: 22,
          borderRadius: 7,
          background: active ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#e2e8f0',
          color: active ? '#fff' : '#94a3b8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800,
          transition: 'background 0.14s, color 0.14s',
          flexShrink: 0,
        }}>
          {number}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          color: active ? '#4f46e5' : '#475569',
          fontWeight: 600, fontSize: 13,
          transition: 'color 0.14s',
        }}>
          {icon}
          {label}
        </div>
      </div>
      {children}
    </div>
  );
}

function CancelButton({ onClick, disabled }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 18px',
        borderRadius: 9,
        border: '1px solid #e2e8f0',
        background: hovered ? '#f1f5f9' : '#f8fafc',
        color: '#475569',
        fontSize: 13, fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.12s',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      Cancel
    </button>
  );
}

function SubmitButton({ canSubmit, loading, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const disabled = !canSubmit || loading;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 20px',
        borderRadius: 9,
        border: 'none',
        background: disabled ? '#e2e8f0' : hovered ? '#3730a3' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: disabled ? '#94a3b8' : '#fff',
        fontSize: 13, fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 7,
        boxShadow: !disabled ? (hovered ? '0 6px 20px rgba(79,70,229,0.4)' : '0 2px 8px rgba(79,70,229,0.25)') : 'none',
        transform: !disabled && hovered ? 'translateY(-1px)' : 'none',
        transition: 'background 0.14s, box-shadow 0.14s, transform 0.14s',
      }}
    >
      {loading && (
        <span style={{
          width: 13, height: 13,
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 0.65s linear infinite',
          display: 'inline-block',
        }} />
      )}
      {loading ? 'Processing…' : 'Start autofill →'}
    </button>
  );
}
