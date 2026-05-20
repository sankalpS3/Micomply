export const STATUS_LABELS = {
  active: 'Active',
  completed: 'Completed',
  submitted: 'Submitted to HC',
  ready_to_review: 'Ready to review',
  in_progress: 'In progress',
  overdue: 'Overdue',
};

export function getStatusColor(pct) {
  if (pct >= 80) return '#10b981';
  if (pct >= 30) return '#f59e0b';
  return '#e2e8f0';
}

export function getStatusGradient(pct) {
  if (pct >= 80) return 'linear-gradient(90deg, #10b981, #059669)';
  if (pct >= 30) return 'linear-gradient(90deg, #f59e0b, #d97706)';
  return null;
}

export function getStatusClass(pct) {
  if (pct >= 80) return 'complete';
  if (pct >= 30) return 'partial';
  return 'empty';
}

export function formatDaysLate(dueDate) {
  const due = new Date(dueDate);
  const now = new Date();
  const diffMs = now - due;
  if (diffMs <= 0) return null;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? 's' : ''} late`;
}
