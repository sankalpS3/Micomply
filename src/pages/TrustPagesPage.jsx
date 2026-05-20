import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ComingSoon } from '../components/common/ComingSoon';
import { BsShieldFillCheck } from 'react-icons/bs';

export default function TrustPagesPage() {
  return (
    <Layout title="Trust Pages">
      <ComingSoon
        icon={<BsShieldFillCheck />}
        title="Trust Pages"
        description="Build a public-facing trust center showcasing your security posture, compliance certifications, and uptime — giving prospects instant confidence."
        color="#d97706"
        bg="#fef3c7"
      />
    </Layout>
  );
}
