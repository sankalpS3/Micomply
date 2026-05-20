/* Props: questionnaire (object), teamMembers ([]) */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../common/StatusBar';
import { Avatar } from '../common/Avatar';
import { formatDaysLate } from '../../utils/statusHelpers';
import { BsExclamationCircleFill, BsChevronRight } from 'react-icons/bs';

export function QuestionnaireCard({ questionnaire, teamMembers }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const owner = teamMembers?.find((m) => m.id === questionnaire.ownerId);
  const daysLate = questionnaire.dueDate ? formatDaysLate(questionnaire.dueDate) : null;
  const pct = questionnaire.completionPct || 0;

  function handleClick() {
    navigate(`/questionnaires/${questionnaire.id}`);
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? '#c7d2fe' : '#e2e8f0'}`,
        borderRadius: 12,
        padding: '14px 18px 14px 20px',
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
        transition: 'border-color 0.14s, box-shadow 0.14s, transform 0.14s',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered
          ? '0 4px 18px rgba(15,23,42,0.09)'
          : '0 1px 3px rgba(15,23,42,0.04)',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: 4,
        background: 'linear-gradient(180deg, #4f46e5, #7c3aed)',
        borderRadius: '4px 0 0 4px',
        transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'center',
        transition: 'transform 0.14s cubic-bezier(0.34,1.56,0.64,1)',
      }} />

      {/* Name + customer */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14,
          fontWeight: 600,
          color: hovered ? '#4f46e5' : '#0f172a',
          transition: 'color 0.14s',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginBottom: 3,
        }}>
          {questionnaire.name}
        </div>
        <div style={{
          fontSize: 12,
          color: '#64748b',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {questionnaire.customer}
        </div>
      </div>

      {/* Progress bar + label */}
      <div style={{ width: 140, flexShrink: 0 }}>
        <StatusBar pct={pct} height={5} />
        <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'right', marginTop: 4 }}>
          {pct}% complete
        </div>
      </div>

      {/* Overdue pill */}
      {daysLate && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 11,
          fontWeight: 600,
          color: '#dc2626',
          background: '#fee2e2',
          padding: '3px 10px',
          borderRadius: 20,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          <BsExclamationCircleFill size={10} />
          {daysLate}
        </div>
      )}

      {/* Owner */}
      <div style={{ flexShrink: 0, width: 28 }}>
        {owner && <Avatar user={owner} size={28} />}
      </div>

      {/* Chevron */}
      <BsChevronRight
        size={12}
        style={{
          color: hovered ? '#4f46e5' : '#cbd5e1',
          transition: 'color 0.14s, transform 0.14s',
          transform: hovered ? 'translateX(3px)' : 'none',
          flexShrink: 0,
        }}
      />
    </div>
  );
}
