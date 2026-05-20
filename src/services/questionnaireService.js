import api from './api';

// TODO: connect to real API
const MOCK_QUESTIONNAIRES = [
  {
    id: '1',
    name: 'Security Assessment Q1 2026',
    customer: 'Acme Corp',
    status: 'ready_to_review',
    completionPct: 85,
    dueDate: '2026-04-20',
    ownerId: 'u1',
    tab: 'active',
  },
  {
    id: '2',
    name: 'Annual Vendor Due Diligence',
    customer: 'GlobalTech Inc',
    status: 'in_progress',
    completionPct: 45,
    dueDate: '2026-05-15',
    ownerId: 'u2',
    tab: 'active',
  },
  {
    id: '3',
    name: 'SOC 2 Compliance Review',
    customer: 'Startup XYZ',
    status: 'overdue',
    completionPct: 20,
    dueDate: '2026-04-01',
    ownerId: 'u1',
    tab: 'active',
  },
  {
    id: '4',
    name: 'ISO 27001 Audit 2025',
    customer: 'Enterprise Co',
    status: 'completed',
    completionPct: 100,
    dueDate: '2025-12-01',
    ownerId: 'u3',
    tab: 'completed',
  },
  {
    id: '5',
    name: 'GDPR Data Processing Review',
    customer: 'EU Partner GmbH',
    status: 'submitted',
    completionPct: 100,
    dueDate: '2025-11-15',
    ownerId: 'u2',
    tab: 'submitted',
  },
];

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    questionnaireId: '1',
    text: 'Does your organization have a formal information security policy?',
    answer: 'Yes, we maintain a comprehensive information security policy that is reviewed annually and approved by senior management.',
    status: 'approved',
    confidence: 0.95,
    assigneeId: 'u1',
  },
  {
    id: 'q2',
    questionnaireId: '1',
    text: 'Do you perform regular vulnerability assessments and penetration testing?',
    answer: 'We conduct quarterly vulnerability scans and annual penetration tests performed by certified third-party security firms.',
    status: 'autoanswered',
    confidence: 0.88,
    assigneeId: null,
  },
  {
    id: 'q3',
    questionnaireId: '1',
    text: 'What encryption standards do you use for data at rest and in transit?',
    answer: 'AES-256 for data at rest and TLS 1.2+ for data in transit.',
    status: 'pending',
    confidence: 0.72,
    assigneeId: 'u2',
  },
  {
    id: 'q4',
    questionnaireId: '1',
    text: 'Describe your incident response process.',
    answer: '',
    status: 'rejected',
    confidence: 0.0,
    assigneeId: 'u1',
  },
];

export async function getQuestionnaires() {
  // TODO: connect to real API — GET /api/questionnaires
  return MOCK_QUESTIONNAIRES;
}

export async function getQuestionnaire(id) {
  // TODO: connect to real API — GET /api/questionnaires/:id
  const q = MOCK_QUESTIONNAIRES.find((q) => q.id === id);
  const questions = MOCK_QUESTIONS.filter((q) => q.questionnaireId === id);
  return { ...q, questions };
}

export async function createQuestionnaire(data) {
  // TODO: connect to real API — POST /api/questionnaires
  return { id: String(Date.now()), ...data, completionPct: 0, tab: 'active' };
}
