/* Props: tabs ([{ key, label, count }]), activeTab, onTabChange */
import React from 'react';

export function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div style={{
      display: 'inline-flex',
      gap: 2,
      background: '#f1f5f9',
      padding: 4,
      borderRadius: 10,
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TabButton
            key={tab.key}
            tab={tab}
            isActive={isActive}
            onTabChange={onTabChange}
          />
        );
      })}
    </div>
  );
}

function TabButton({ tab, isActive, onTabChange }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={() => onTabChange(tab.key)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: 'none',
        cursor: 'pointer',
        padding: '6px 14px',
        borderRadius: 7,
        fontSize: 13,
        fontWeight: isActive ? 600 : 500,
        color: isActive ? '#1e293b' : hovered ? '#475569' : '#64748b',
        background: isActive ? '#ffffff' : 'transparent',
        boxShadow: isActive ? '0 1px 4px rgba(15,23,42,0.1), 0 1px 2px rgba(15,23,42,0.06)' : 'none',
        transition: 'all 0.14s',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        whiteSpace: 'nowrap',
      }}
    >
      {tab.label}
      {tab.count != null && (
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          padding: '1px 7px',
          borderRadius: 20,
          background: isActive ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#e2e8f0',
          color: isActive ? '#fff' : '#64748b',
          transition: 'background 0.14s, color 0.14s',
          minWidth: 20,
          textAlign: 'center',
        }}>
          {tab.count}
        </span>
      )}
    </button>
  );
}
