
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TenantInsights } from '@/components/tenants/TenantInsights';

const Tenants: React.FC = () => {
  return (
    <DashboardLayout>
      <TenantInsights />
    </DashboardLayout>
  );
};

export default Tenants;
