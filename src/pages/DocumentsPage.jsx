import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ComingSoon } from '../components/common/ComingSoon';
import { BsFileEarmarkFill } from 'react-icons/bs';

export default function DocumentsPage() {
  return (
    <Layout title="Documents">
      <ComingSoon
        icon={<BsFileEarmarkFill />}
        title="Documents"
        description="Organize your security documentation — SOC 2 reports, pen test results, policies, and certifications — and share them instantly with prospects."
        color="#059669"
        bg="#d1fae5"
      />
    </Layout>
  );
}
