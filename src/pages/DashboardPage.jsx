import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useQuestionnaires } from '../hooks/useQuestionnaires';
import { StatusBar } from '../components/common/StatusBar';
import {
  BsFileEarmarkText, BsCheckCircleFill, BsSendFill, BsExclamationTriangleFill,
} from 'react-icons/bs';

const STATS_CONFIG = [
  {
    label: 'Active',
    icon: <BsFileEarmarkText />,
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    blobColor: '#4f46e5',
    textColor: '#4f46e5',
  },
  {
    label: 'Completed',
    icon: <BsCheckCircleFill />,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    blobColor: '#10b981',
    textColor: '#059669',
  },
  {
    label: 'Submitted',
    icon: <BsSendFill />,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
    blobColor: '#06b6d4',
    textColor: '#0284c7',
  },
  {
    label: 'Overdue',
    icon: <BsExclamationTriangleFill />,
    gradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
    blobColor: '#dc2626',
    textColor: '#dc2626',
  },
];

export default function DashboardPage() {
  const { questionnaires, loading } = useQuestionnaires();

  const active    = questionnaires.filter((q) => q.tab === 'active');
  const completed = questionnaires.filter((q) => q.tab === 'completed');
  const submitted = questionnaires.filter((q) => q.tab === 'submitted');
  const overdue   = questionnaires.filter((q) => q.status === 'overdue');
  const counts    = [active.length, completed.length, submitted.length, overdue.length];

  return (
    <Layout title="Dashboard">
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            {STATS_CONFIG.map((cfg, i) => (
              <div key={cfg.label} className="col-sm-6 col-lg-3">
                <div
                  className="stat-card animate-fade-in-up"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <div className="stat-card__bg-blob" style={{ background: cfg.blobColor }} />
                  <div className="stat-card__icon-wrap" style={{ background: cfg.gradient }}>
                    {cfg.icon}
                  </div>
                  <div className="stat-card__label">{cfg.label}</div>
                  <div className="stat-card__value" style={{ color: cfg.textColor }}>
                    {counts[i]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: '220ms' }}>
            <div className="card-header bg-white">Recent questionnaires</div>
            <div className="card-body p-0">
              {active.slice(0, 5).map((q) => (
                <RecentRow key={q.id} q={q} />
              ))}
              {active.length === 0 && (
                <div className="text-muted text-center py-5" style={{ fontSize: 14 }}>
                  No active questionnaires.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

function RecentRow({ q }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="d-flex align-items-center gap-3 px-3 py-3 border-bottom"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#f8faff' : 'transparent',
        transition: 'background 0.14s',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: hovered ? '#4f46e5' : '#1e293b', transition: 'color 0.14s' }}>
          {q.name}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{q.customer}</div>
      </div>
      <div style={{ width: 120 }}>
        <StatusBar pct={q.completionPct} height={6} />
        <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'right', marginTop: 2 }}>
          {q.completionPct}%
        </div>
      </div>
    </div>
  );
}
