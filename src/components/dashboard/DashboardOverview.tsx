
import React from 'react';
import { 
  Users, 
  Building, 
  CreditCard, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Store,
  Activity,
  Filter
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Chart } from './Chart';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const revenueData = [
  { name: 'Jan', revenue: 4000, projected: 2400 },
  { name: 'Feb', revenue: 3000, projected: 1398 },
  { name: 'Mar', revenue: 2000, projected: 9800 },
  { name: 'Apr', revenue: 2780, projected: 3908 },
  { name: 'May', revenue: 1890, projected: 4800 },
  { name: 'Jun', revenue: 2390, projected: 3800 },
  { name: 'Jul', revenue: 3490, projected: 4300 },
];

const tenantData = [
  { name: 'Jan', active: 20, newSignups: 5 },
  { name: 'Feb', active: 25, newSignups: 8 },
  { name: 'Mar', active: 30, newSignups: 12 },
  { name: 'Apr', active: 40, newSignups: 15 },
  { name: 'May', active: 45, newSignups: 10 },
  { name: 'Jun', active: 50, newSignups: 12 },
  { name: 'Jul', active: 55, newSignups: 8 },
];

const subscriptionData = [
  { name: 'Free Trial', value: 25 },
  { name: '$50 Plan', value: 40 },
  { name: '$80 Plan', value: 25 },
  { name: '$100 Plan', value: 10 },
];

const marketplaceData = [
  { name: 'Health & Wellness', value: 30 },
  { name: 'Technology', value: 25 },
  { name: 'Education', value: 20 },
  { name: 'Professional Services', value: 15 },
  { name: 'E-commerce', value: 10 },
];

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and key metrics</p>
        </div>
        <div className="flex items-center gap-x-2 mt-4 sm:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>This Quarter</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
              <DropdownMenuItem>Custom Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-9">Export</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Tenants" 
          value="125" 
          description="Active and trial accounts" 
          icon={<Building className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <MetricCard 
          title="Total Marketplaces" 
          value="96" 
          description="Across all tenants" 
          icon={<Store className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <MetricCard 
          title="Monthly Revenue" 
          value="$24,500" 
          description="All subscription tiers" 
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 23, positive: true }}
        />
        <MetricCard 
          title="Churn Rate" 
          value="2.4%" 
          description="Last 30 days" 
          icon={<TrendingDown className="h-4 w-4" />}
          trend={{ value: 0.5, positive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          title="Revenue Growth" 
          description="Monthly revenue vs projections"
          data={revenueData}
          type="area"
          yKeys={['revenue', 'projected']}
          height={300}
        />
        <Chart 
          title="Tenant Growth" 
          description="Active tenants and new signups"
          data={tenantData}
          type="line"
          yKeys={['active', 'newSignups']}
          height={300}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart 
          title="Subscription Distribution" 
          description="Breakdown by pricing tier"
          data={subscriptionData}
          type="pie"
          height={300}
        />
        <Chart 
          title="Top Industries" 
          description="Marketplace category distribution"
          data={marketplaceData}
          type="bar"
          yKeys={['value']}
          height={300}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium">Real-Time Notifications</h3>
          </div>
          <div className="mt-3 space-y-2">
            <div className="bg-card p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <p className="text-sm">New tenant signup: <span className="font-medium">TechCorp Inc.</span></p>
              </div>
              <span className="text-xs text-muted-foreground">2 mins ago</span>
            </div>
            <div className="bg-card p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                <p className="text-sm">Subscription payment pending: <span className="font-medium">Health Plus LLC</span></p>
              </div>
              <span className="text-xs text-muted-foreground">15 mins ago</span>
            </div>
            <div className="bg-card p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                <p className="text-sm">Failed payment for: <span className="font-medium">Global Services Co.</span></p>
              </div>
              <span className="text-xs text-muted-foreground">47 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
