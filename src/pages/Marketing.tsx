
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { MarketingCampaigns } from '@/components/marketing/MarketingCampaigns';
import { MarketingAssets } from '@/components/marketing/MarketingAssets';
import { MarketingPerformance } from '@/components/marketing/MarketingPerformance';

const Marketing: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
          <p className="text-muted-foreground">
            Manage campaigns, assets, and track marketing performance.
          </p>
        </div>
        
        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="assets">Assets & Resources</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="campaigns">
            <MarketingCampaigns />
          </TabsContent>
          <TabsContent value="assets">
            <MarketingAssets />
          </TabsContent>
          <TabsContent value="performance">
            <MarketingPerformance />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Marketing;
