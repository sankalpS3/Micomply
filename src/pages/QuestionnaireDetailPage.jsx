import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { QuestionnaireDetail } from '../components/questionnaires/QuestionnaireDetail';
import { useAuth } from '../context/AuthContext';
import { getQuestionnaire } from '../services/questionnaireService';
import { BsArrowLeft } from 'react-icons/bs';

export default function QuestionnaireDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teamMembers } = useAuth();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getQuestionnaire(id)
      .then(setQuestionnaire)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Layout title={questionnaire?.name || 'Questionnaire'}>
      <BackButton onClick={() => navigate('/questionnaires')} />

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" style={{ color: '#4f46e5' }} />
        </div>
      )}
      {error && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: 10,
          padding: '12px 16px',
          fontSize: 14,
          color: '#991b1b',
        }}>
          {error}
        </div>
      )}
      {!loading && questionnaire && (
        <QuestionnaireDetail questionnaire={questionnaire} teamMembers={teamMembers} />
      )}
    </Layout>
  );
}

function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 14px',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        background: hovered ? '#f5f3ff' : '#fff',
        color: hovered ? '#4f46e5' : '#475569',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        marginBottom: 20,
        transform: hovered ? 'translateX(-2px)' : 'none',
        transition: 'all 0.14s',
      }}
    >
      <BsArrowLeft size={14} />
      Back to questionnaires
    </button>
  );
}
