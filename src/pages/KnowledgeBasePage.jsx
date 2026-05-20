import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ComingSoon } from '../components/common/ComingSoon';
import { BsBook } from 'react-icons/bs';

export default function KnowledgeBasePage() {
  return (
    <Layout title="Knowledge Base">
      <ComingSoon
        icon={<BsBook />}
        title="Knowledge Base"
        description="Store, search, and manage your organization's security answers, policies, and documentation — all in one place for lightning-fast questionnaire responses."
        color="#4f46e5"
        bg="#eef2ff"
      />
    </Layout>
  );
}
