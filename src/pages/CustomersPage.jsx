import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ComingSoon } from '../components/common/ComingSoon';
import { BsPeopleFill } from 'react-icons/bs';

export default function CustomersPage() {
  return (
    <Layout title="Customers">
      <ComingSoon
        icon={<BsPeopleFill />}
        title="Customers"
        description="Manage your customer relationships, track their questionnaire submissions, and view security assessment history across all accounts."
        color="#7c3aed"
        bg="#f5f3ff"
      />
    </Layout>
  );
}
