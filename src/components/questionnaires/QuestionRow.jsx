/* Props: question (object), questionIndex (number), teamMembers ([]), onApprove, onReject, onAssign */
import React, { useState } from 'react';
import { ApprovalBadge } from './ApprovalBadge';
import { Avatar } from '../common/Avatar';
import { BsCheckLg, BsXLg, BsPencil, BsFloppy } from 'react-icons/bs';

export function QuestionRow({ question, questionIndex, teamMembers, onApprove, onReject, onAssign }) {
  const [editing, setEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(question.answer);
  const [hovered, setHovered] = useState(false);
  const assignee = teamMembers?.find((m) => m.id === question.assigneeId);
  const isApproved = question.status === 'approved';
  const confidencePct = question.confidence > 0 ? Math.round(question.confidence * 100) : 0;

  const borderColor = isApproved ? '#10b981' : hovered ? '#4f46e5' : 'transparent';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderLeft: `3.5px solid ${borderColor}`,
        borderRadius: 12,
        padding: 20,
        marginBottom: 8,
        transition: 'border-left-color 0.14s, box-shadow 0.14s',
        boxShadow: hovered ? '0 4px 16px rgba(15,23,42,0.07)' : '0 1px 3px rgba(15,23,42,0.04)',
      }}
    >
      {/* Question header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#0f172a', lineHeight: 1.55, flex: 1 }}>
          {questionIndex != null && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22, height: 22,
              borderRadius: 6,
              background: '#f1f5f9',
              fontSize: 10,
              fontWeight: 800,
              color: '#64748b',
              marginRight: 8,
              verticalAlign: 'middle',
              flexShrink: 0,
            }}>
              {questionIndex + 1}
            </span>
          )}
          {question.text}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <ApprovalBadge status={question.status} />
          {confidencePct > 0 && !isApproved && <ConfidenceBar pct={confidencePct} />}
        </div>
      </div>

      {/* Answer */}
      {editing ? (
        <textarea
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            border: '1.5px solid #4f46e5',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 14,
            color: '#334155',
            lineHeight: 1.65,
            resize: 'vertical',
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(79,70,229,0.1)',
            fontFamily: 'inherit',
            marginBottom: 14,
            display: 'block',
            boxSizing: 'border-box',
            transition: 'border-color 0.14s',
          }}
        />
      ) : (
        <div style={{
          fontSize: 14,
          color: '#475569',
          background: isApproved ? '#f0fdf4' : '#f8fafc',
          borderRadius: 8,
          padding: '10px 14px',
          border: `1px solid ${isApproved ? '#bbf7d0' : '#e2e8f0'}`,
          lineHeight: 1.7,
          marginBottom: 14,
          transition: 'background 0.14s, border-color 0.14s',
        }}>
          {question.answer || <em style={{ color: '#94a3b8' }}>No answer provided.</em>}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {!isApproved && (
          <>
            <ActionBtn
              icon={<BsCheckLg size={11} />}
              label="Approve"
              color="#fff"
              bg="linear-gradient(135deg, #10b981, #059669)"
              hoverBg="#047857"
              onClick={() => onApprove(question.id)}
            />
            <ActionBtn
              icon={<BsXLg size={10} />}
              label="Reject"
              color="#fff"
              bg="linear-gradient(135deg, #f87171, #dc2626)"
              hoverBg="#b91c1c"
              onClick={() => onReject(question.id)}
            />
            {question.status === 'rejected' && !editing && (
              <ActionBtn
                icon={<BsPencil size={10} />}
                label="Edit answer"
                color="#475569"
                bg="#f1f5f9"
                hoverBg="#e2e8f0"
                border="1px solid #e2e8f0"
                onClick={() => setEditing(true)}
              />
            )}
            {editing && (
              <ActionBtn
                icon={<BsFloppy size={11} />}
                label="Save & approve"
                color="#fff"
                bg="linear-gradient(135deg, #4f46e5, #7c3aed)"
                hoverBg="#3730a3"
                onClick={() => { setEditing(false); onApprove(question.id); }}
              />
            )}
          </>
        )}

        {isApproved && (
          <div style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>
            ✓ Approved
          </div>
        )}

        {/* Assignee */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {assignee ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Assigned to</span>
              <Avatar user={assignee} size={26} />
            </div>
          ) : (
            <select
              defaultValue=""
              onChange={(e) => { if (e.target.value) onAssign(question.id, e.target.value); }}
              style={{
                fontSize: 12,
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: 7,
                padding: '5px 10px',
                background: '#f8fafc',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="" disabled>Assign to…</option>
              {teamMembers?.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

function ConfidenceBar({ pct }) {
  const color = pct >= 80 ? '#10b981' : pct >= 55 ? '#f59e0b' : '#f87171';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 44, height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{pct}%</span>
    </div>
  );
}

function ActionBtn({ icon, label, color, bg, hoverBg, border, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '6px 13px',
        borderRadius: 7,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        border: border || 'none',
        background: hovered ? hoverBg : bg,
        color,
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        transition: 'background 0.12s, transform 0.12s, box-shadow 0.12s',
      }}
    >
      {icon}
      {label}
    </button>
  );
}
