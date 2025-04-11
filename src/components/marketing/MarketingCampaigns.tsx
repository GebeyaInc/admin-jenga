
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, TrendingUp, Edit } from 'lucide-react';

export const MarketingCampaigns: React.FC = () => {
  // Simulated campaigns data
  const campaigns = [
    {
      id: 1,
      name: 'Jenga Platform Launch',
      status: 'active',
      startDate: '2025-04-01',
      endDate: '2025-05-15',
      audience: 'Tech businesses & freelancers',
      budget: '$5,000',
      progress: 65
    },
    {
      id: 2,
      name: 'Spring Developer Promotion',
      status: 'upcoming',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      audience: 'Web developers',
      budget: '$3,500',
      progress: 0
    },
    {
      id: 3,
      name: 'Enterprise Solution Webinar',
      status: 'completed',
      startDate: '2025-03-10',
      endDate: '2025-03-25',
      audience: 'Enterprise clients',
      budget: '$2,000',
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Marketing Campaigns</h2>
        <Button>
          <span className="mr-2">Create Campaign</span>
          <span className="sr-only">Create a new campaign</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <Card key={campaign.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{campaign.startDate} to {campaign.endDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{campaign.audience}</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Budget: {campaign.budget}</span>
                </div>
                {campaign.status === 'active' && (
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-1 flex justify-between">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-end w-full">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
