
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomerFeedback } from '@/components/cx/CustomerFeedback';
import { SupportTickets } from '@/components/cx/SupportTickets';
import { CustomerSatisfaction } from '@/components/cx/CustomerSatisfaction';

const CustomerExperience: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Experience</h1>
          <p className="text-muted-foreground">
            Manage customer interactions, feedback, and support tickets.
          </p>
        </div>
        
        <Tabs defaultValue="feedback" className="space-y-4">
          <TabsList>
            <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
            <TabsTrigger value="support">Support Tickets</TabsTrigger>
            <TabsTrigger value="satisfaction">Customer Satisfaction</TabsTrigger>
          </TabsList>
          <TabsContent value="feedback">
            <CustomerFeedback />
          </TabsContent>
          <TabsContent value="support">
            <SupportTickets />
          </TabsContent>
          <TabsContent value="satisfaction">
            <CustomerSatisfaction />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerExperience;
