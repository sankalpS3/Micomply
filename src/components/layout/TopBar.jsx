import React from 'react';
import { BsBell } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';

/* Props: title (string) */
export function TopBar({ title }) {
  const { currentUser } = useAuth();
  return (
    <header
      style={{
        height: 64,
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <h1
        style={{
          fontSize: 18,
          fontWeight: 700,
          margin: 0,
          color: '#0f172a',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BellButton />
        <AvatarButton user={currentUser} />
      </div>
    </header>
  );
}

function BellButton() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      title="Notifications"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        border: 'none',
        background: hovered ? '#f1f5f9' : 'transparent',
        color: hovered ? '#4f46e5' : '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.14s, color 0.14s',
      }}
    >
      <BsBell size={18} />
    </button>
  );
}

function AvatarButton({ user }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'transform 0.14s, box-shadow 0.14s',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        boxShadow: hovered ? '0 0 0 3px rgba(79,70,229,0.22)' : 'none',
      }}
    >
      <Avatar user={user} size={34} />
    </div>
  );
}
