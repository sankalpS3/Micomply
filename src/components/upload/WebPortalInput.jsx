/* Props: value (string), onChange (fn) */
import React from 'react';
import { BsLink45Deg } from 'react-icons/bs';

export function WebPortalInput({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text">
        <BsLink45Deg size={18} />
      </span>
      <input
        type="url"
        className="form-control"
        placeholder="https://portal.onetrust.com/..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
