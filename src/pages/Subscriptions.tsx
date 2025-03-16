
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SubscriptionManagement } from '@/components/subscriptions/SubscriptionManagement';

const Subscriptions: React.FC = () => {
  return (
    <DashboardLayout>
      <SubscriptionManagement />
    </DashboardLayout>
  );
};

export default Subscriptions;
