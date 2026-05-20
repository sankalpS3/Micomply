import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ComingSoon } from '../components/common/ComingSoon';
import { BsBarChartFill } from 'react-icons/bs';

export default function AnalyticsPage() {
  return (
    <Layout title="Analytics">
      <ComingSoon
        icon={<BsBarChartFill />}
        title="Analytics"
        description="Track questionnaire completion rates, team performance, response times, and knowledge base coverage — all in a single interactive dashboard."
        color="#0891b2"
        bg="#e0f2fe"
      />
    </Layout>
  );
}
