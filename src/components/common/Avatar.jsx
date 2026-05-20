/* Props: user ({ initials, color, name }), size (px, optional) */
import React from 'react';

const GRADIENTS = [
  'linear-gradient(135deg, #4f46e5, #7c3aed)',
  'linear-gradient(135deg, #0891b2, #0284c7)',
  'linear-gradient(135deg, #059669, #047857)',
  'linear-gradient(135deg, #d97706, #b45309)',
  'linear-gradient(135deg, #dc2626, #b91c1c)',
  'linear-gradient(135deg, #7c3aed, #6d28d9)',
];

function nameHash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function Avatar({ user, size = 32 }) {
  if (!user) return null;
  const gradient = GRADIENTS[nameHash(user.name) % GRADIENTS.length];

  return (
    <div
      title={user.name}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: user.color?.startsWith('#') ? user.color : gradient,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.floor(size * 0.36),
        fontWeight: 700,
        flexShrink: 0,
        userSelect: 'none',
        letterSpacing: '0.02em',
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
      }}
    >
      {user.initials}
    </div>
  );
}
