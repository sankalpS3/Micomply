import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { QuestionnaireList } from '../components/questionnaires/QuestionnaireList';
import { NewQuestionnaireModal } from '../components/questionnaires/NewQuestionnaireModal';
import { useQuestionnaires } from '../hooks/useQuestionnaires';
import { useAuth } from '../context/AuthContext';
import { createQuestionnaire } from '../services/questionnaireService';
import { uploadFile, submitPortalUrl } from '../services/uploadService';
import { BsPlus } from 'react-icons/bs';

export default function QuestionnairesPage() {
  const { questionnaires, loading, error, dispatch } = useQuestionnaires();
  const { teamMembers } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  async function handleNewQuestionnaire({ file, portalUrl }) {
    if (file) await uploadFile(file);
    else await submitPortalUrl(portalUrl);

    const newQ = await createQuestionnaire({
      name: file ? file.name.replace(/\.[^.]+$/, '') : 'Web Portal Questionnaire',
      customer: 'New Customer',
      status: 'in_progress',
      completionPct: 0,
      dueDate: null,
      ownerId: null,
      tab: 'active',
    });
    dispatch({ type: 'ADD_QUESTIONNAIRE', payload: newQ });
  }

  return (
    <Layout title="Questionnaires">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <NewQuestionnaireButton onClick={() => setModalOpen(true)} />
      </div>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" style={{ color: '#4f46e5' }} />
        </div>
      )}
      {error && (
        <div style={{
          background: '#fee2e2', border: '1px solid #fca5a5',
          borderRadius: 10, padding: '12px 16px',
          fontSize: 14, color: '#991b1b',
        }}>
          {error}
        </div>
      )}
      {!loading && (
        <QuestionnaireList questionnaires={questionnaires} teamMembers={teamMembers} />
      )}

      <NewQuestionnaireModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewQuestionnaire}
      />
    </Layout>
  );
}

function NewQuestionnaireButton({ onClick }) {
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
        padding: '9px 18px',
        borderRadius: 10,
        border: 'none',
        background: hovered ? '#3730a3' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: '#fff',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 6px 22px rgba(79,70,229,0.42)'
          : '0 2px 10px rgba(79,70,229,0.28)',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'background 0.14s, box-shadow 0.14s, transform 0.14s',
        letterSpacing: '0.01em',
      }}
    >
      <BsPlus size={18} />
      New questionnaire
    </button>
  );
}
