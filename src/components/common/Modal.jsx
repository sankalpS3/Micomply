/* Props: isOpen, onClose, title, children, size ('sm'|'md'|'lg') */
import React, { useEffect } from 'react';

const MAX_WIDTHS = { sm: 420, md: 560, lg: 720 };

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050,
        padding: 16,
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          width: '100%',
          maxWidth: MAX_WIDTHS[size] || 560,
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(15,23,42,0.22), 0 8px 24px rgba(15,23,42,0.1)',
          animation: 'slideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 18px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.01em',
          }}>
            {title}
          </h2>
          <CloseButton onClose={onClose} />
        </div>

        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function CloseButton({ onClose }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        border: 'none',
        borderRadius: 8,
        background: hovered ? '#f1f5f9' : 'transparent',
        color: hovered ? '#1e293b' : '#94a3b8',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        lineHeight: 1,
        flexShrink: 0,
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      ×
    </button>
  );
}
