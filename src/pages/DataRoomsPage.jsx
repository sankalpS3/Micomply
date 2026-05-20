import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ComingSoon } from '../components/common/ComingSoon';
import { BsServer } from 'react-icons/bs';

export default function DataRoomsPage() {
  return (
    <Layout title="Data Rooms">
      <ComingSoon
        icon={<BsServer />}
        title="Data Rooms"
        description="Create secure, access-controlled virtual data rooms for sharing sensitive documents with prospects during due diligence — with full audit trails."
        color="#dc2626"
        bg="#fee2e2"
      />
    </Layout>
  );
}
