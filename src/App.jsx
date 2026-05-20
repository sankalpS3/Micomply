import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuestionnaireProvider } from './context/QuestionnaireContext';

import DashboardPage from './pages/DashboardPage';
import QuestionnairesPage from './pages/QuestionnairesPage';
import QuestionnaireDetailPage from './pages/QuestionnaireDetailPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import DocumentsPage from './pages/DocumentsPage';
import TrustPagesPage from './pages/TrustPagesPage';
import DataRoomsPage from './pages/DataRoomsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CustomersPage from './pages/CustomersPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuestionnaireProvider>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/questionnaires" element={<QuestionnairesPage />} />
            <Route path="/questionnaires/:id" element={<QuestionnaireDetailPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/trust-pages" element={<TrustPagesPage />} />
            <Route path="/data-rooms" element={<DataRoomsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </QuestionnaireProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
