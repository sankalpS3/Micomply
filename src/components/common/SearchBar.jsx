/* Props: value, onChange, placeholder */
import React, { useState } from 'react';
import { BsSearch, BsXLg } from 'react-icons/bs';

export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: focused ? '#fff' : '#f8fafc',
        border: `1.5px solid ${focused ? '#4f46e5' : '#e2e8f0'}`,
        borderRadius: 10,
        padding: '7px 12px',
        maxWidth: 300,
        width: '100%',
        boxShadow: focused ? '0 0 0 3px rgba(79,70,229,0.1)' : 'none',
        transition: 'border-color 0.14s, box-shadow 0.14s, background 0.14s',
      }}
    >
      <BsSearch
        size={13}
        style={{
          color: focused ? '#4f46e5' : '#94a3b8',
          flexShrink: 0,
          transition: 'color 0.14s',
        }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontSize: 13,
          color: '#1e293b',
          width: '100%',
          minWidth: 0,
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#94a3b8',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <BsXLg size={10} />
        </button>
      )}
    </div>
  );
}
