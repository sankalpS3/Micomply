/* Props: questionnaire (object with questions[]), teamMembers ([]) */
import React, { useMemo } from 'react';
import { QuestionRow } from './QuestionRow';
import { StatusBar } from '../common/StatusBar';
import { useReview } from '../../hooks/useReview';
import {
  BsCheckCircleFill, BsClockFill, BsRobot, BsXCircleFill, BsListUl,
} from 'react-icons/bs';

export function QuestionnaireDetail({ questionnaire, teamMembers }) {
  const { approve, reject, assign } = useReview();

  const questions = questionnaire?.questions || [];
  const stats = useMemo(() => ({
    total:        questions.length,
    autoanswered: questions.filter((q) => q.status === 'autoanswered').length,
    approved:     questions.filter((q) => q.status === 'approved').length,
    pending:      questions.filter((q) => q.status === 'pending').length,
    rejected:     questions.filter((q) => q.status === 'rejected').length,
  }), [questions]);

  if (!questionnaire) return null;

  return (
    <div>
      {/* Header card */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 28,
        marginBottom: 24,
        boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative gradient blob */}
        <div style={{
          position: 'absolute',
          right: -40, top: -40,
          width: 180, height: 180,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          opacity: 0.04,
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
          <div>
            <h2 style={{
              fontSize: 22,
              fontWeight: 800,
              margin: '0 0 6px',
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}>
              {questionnaire.name}
            </h2>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              {questionnaire.customer}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#4f46e5',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              {questionnaire.completionPct}%
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, fontWeight: 500 }}>
              complete
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <StatusBar pct={questionnaire.completionPct} height={8} />
        </div>

        {/* Stat chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <StatChip icon={<BsListUl />}         label="Total"        value={stats.total}        color="#475569" bg="#f1f5f9" />
          <StatChip icon={<BsRobot />}          label="Auto-answered" value={stats.autoanswered} color="#0284c7" bg="#e0f2fe" />
          <StatChip icon={<BsCheckCircleFill />} label="Approved"     value={stats.approved}     color="#059669" bg="#d1fae5" />
          <StatChip icon={<BsClockFill />}      label="Pending"      value={stats.pending}      color="#d97706" bg="#fef3c7" />
          <StatChip icon={<BsXCircleFill />}    label="Rejected"     value={stats.rejected}     color="#dc2626" bg="#fee2e2" />
        </div>
      </div>

      {/* Questions */}
      {questions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 24px',
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
            No questions yet
          </div>
          <div style={{ fontSize: 13, color: '#94a3b8' }}>
            Questions will appear once the questionnaire is processed.
          </div>
        </div>
      ) : (
        questions.map((q, index) => (
          <QuestionRow
            key={q.id}
            question={q}
            questionIndex={index}
            teamMembers={teamMembers}
            onApprove={approve}
            onReject={reject}
            onAssign={assign}
          />
        ))
      )}
    </div>
  );
}

function StatChip({ icon, label, value, color, bg }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      padding: '5px 12px',
      borderRadius: 20,
      background: bg,
      fontSize: 12,
      fontWeight: 600,
      color,
      whiteSpace: 'nowrap',
    }}>
      {icon}
      <span style={{ color: '#64748b', fontWeight: 500 }}>{label}</span>
      {value}
    </div>
  );
}
