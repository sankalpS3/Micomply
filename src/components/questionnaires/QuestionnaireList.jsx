/* Props: questionnaires ([]), teamMembers ([]) */
import React, { useState } from 'react';
import { Tabs } from '../common/Tabs';
import { SearchBar } from '../common/SearchBar';
import { QuestionnaireCard } from './QuestionnaireCard';
import { BsFileEarmarkText } from 'react-icons/bs';
import '../../styles/questionnaire.css';

const TABS = [
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'submitted', label: 'Submitted to HC' },
];

const STATUS_GROUPS = {
  overdue: 'Overdue',
  ready_to_review: 'Ready to review',
  in_progress: 'In progress',
};

export function QuestionnaireList({ questionnaires, teamMembers }) {
  const [activeTab, setActiveTab] = useState('active');
  const [search, setSearch] = useState('');

  const filtered = questionnaires.filter(
    (q) =>
      q.tab === activeTab &&
      (q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const tabsWithCounts = TABS.map((t) => ({
    ...t,
    count: questionnaires.filter((q) => q.tab === t.key).length,
  }));

  const groups = {};
  if (activeTab === 'active') {
    filtered.forEach((q) => {
      const g = q.status || 'in_progress';
      if (!groups[g]) groups[g] = [];
      groups[g].push(q);
    });
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <Tabs tabs={tabsWithCounts} activeTab={activeTab} onTabChange={setActiveTab} />
        <SearchBar value={search} onChange={setSearch} placeholder="Search questionnaires…" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState activeTab={activeTab} hasSearch={!!search} />
      ) : activeTab === 'active' ? (
        Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div className="questionnaire-group__header">
              {STATUS_GROUPS[group] || group} ({items.length})
            </div>
            {items.map((q) => (
              <QuestionnaireCard key={q.id} questionnaire={q} teamMembers={teamMembers} />
            ))}
          </div>
        ))
      ) : (
        filtered.map((q) => (
          <QuestionnaireCard key={q.id} questionnaire={q} teamMembers={teamMembers} />
        ))
      )}
    </div>
  );
}

function EmptyState({ activeTab, hasSearch }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '64px 24px',
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 14,
    }}>
      <div style={{
        width: 56, height: 56,
        borderRadius: 16,
        background: hasSearch ? '#f1f5f9' : '#eef2ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: 22,
        color: hasSearch ? '#94a3b8' : '#4f46e5',
      }}>
        <BsFileEarmarkText />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>
        {hasSearch ? 'No results found' : `No ${activeTab} questionnaires`}
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 300, margin: '0 auto', lineHeight: 1.6 }}>
        {hasSearch
          ? 'Try different search terms or clear the search.'
          : activeTab === 'active'
            ? 'Use the "+ New questionnaire" button to get started.'
            : `Questionnaires will appear here once they are ${activeTab}.`}
      </div>
    </div>
  );
}
