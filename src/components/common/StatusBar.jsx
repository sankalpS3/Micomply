/* Props: pct (0-100), height (px, optional) */
import React from 'react';
import { getStatusGradient, getStatusColor } from '../../utils/statusHelpers';

export function StatusBar({ pct = 0, height = 8 }) {
  const gradient = getStatusGradient(pct);
  const color = getStatusColor(pct);
  const r = Math.ceil(height / 2);

  return (
    <div style={{
      height,
      borderRadius: r,
      background: '#e2e8f0',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        borderRadius: r,
        background: gradient || color,
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />
    </div>
  );
}
