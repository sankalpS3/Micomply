/* Props: status ('approved'|'pending'|'rejected'|'autoanswered') */
import React from 'react';
import { BsCheckCircleFill, BsClockFill, BsXCircleFill, BsRobot } from 'react-icons/bs';
import '../../styles/questionnaire.css';

const CONFIG = {
  approved:    { label: 'Approved',     icon: <BsCheckCircleFill />, cls: 'approval-badge--approved' },
  pending:     { label: 'Pending',      icon: <BsClockFill />,       cls: 'approval-badge--pending' },
  rejected:    { label: 'Rejected',     icon: <BsXCircleFill />,     cls: 'approval-badge--rejected' },
  autoanswered:{ label: 'Auto-answered',icon: <BsRobot />,            cls: 'approval-badge--autoanswered' },
};

export function ApprovalBadge({ status }) {
  const cfg = CONFIG[status] || CONFIG.pending;
  return (
    <span className={`approval-badge ${cfg.cls}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}
