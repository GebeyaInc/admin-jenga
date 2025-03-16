
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TeamManagement } from '@/components/teams/TeamManagement';

const TeamMembers: React.FC = () => {
  return (
    <DashboardLayout>
      <TeamManagement />
    </DashboardLayout>
  );
};

export default TeamMembers;
