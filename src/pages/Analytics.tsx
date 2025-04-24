import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EnhancedAnalytics } from '@/components/analytics/EnhancedAnalytics';

const Analytics: React.FC = () => {
  return (
    <DashboardLayout>
      <EnhancedAnalytics />
    </DashboardLayout>
  );
};

export default Analytics;
