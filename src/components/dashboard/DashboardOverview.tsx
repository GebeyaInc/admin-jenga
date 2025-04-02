
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
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle
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
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardAnalytics } from '@/services/dashboardService';
import { Skeleton } from '@/components/ui/skeleton';

export const DashboardOverview: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboardAnalytics'],
    queryFn: fetchDashboardAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (error) {
    console.error("Error fetching dashboard data:", error);
  }

  // Determine which data to show - real data or fallbacks
  const revenueData = dashboardData?.revenueData?.length ? dashboardData.revenueData : [];
  const tenantData = dashboardData?.tenantData?.length ? dashboardData.tenantData : [];
  const subscriptionData = dashboardData?.subscriptionData?.length ? dashboardData.subscriptionData : [];
  const marketplaceData = dashboardData?.marketplaceData?.length 
    ? dashboardData.marketplaceData 
    : [{ name: 'No Data', value: 100 }];
  const notifications = dashboardData?.notifications || [];

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
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <MetricCard 
                key={i}
                title={<Skeleton className="h-4 w-24" />}
                value={<Skeleton className="h-8 w-16" />}
                description={<Skeleton className="h-3 w-32" />}
              />
            ))}
          </>
        ) : (
          <>
            <MetricCard 
              title="Total Tenants" 
              value={dashboardData?.totalTenants.toString() || "0"} 
              description="Active and trial accounts" 
              icon={<Building className="h-4 w-4" />}
              trend={{ value: 12, positive: true }}
            />
            <MetricCard 
              title="Total Marketplaces" 
              value={dashboardData?.totalMarketplaces.toString() || "0"} 
              description="Across all tenants" 
              icon={<Store className="h-4 w-4" />}
              trend={{ value: 8, positive: true }}
            />
            <MetricCard 
              title="Monthly Revenue" 
              value={`$${(dashboardData?.monthlyRevenue || 0).toLocaleString()}`} 
              description="All subscription tiers" 
              icon={<DollarSign className="h-4 w-4" />}
              trend={{ value: 23, positive: true }}
            />
            <MetricCard 
              title="Churn Rate" 
              value={`${dashboardData?.churnRate || 0}%`} 
              description="Last 30 days" 
              icon={<TrendingDown className="h-4 w-4" />}
              trend={{ value: 0.5, positive: false }}
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <div className="bg-card border rounded-lg p-6">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-56 mb-4" />
              <Skeleton className="h-[250px] w-full rounded-md" />
            </div>
            <div className="bg-card border rounded-lg p-6">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-56 mb-4" />
              <Skeleton className="h-[250px] w-full rounded-md" />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <div className="bg-card border rounded-lg p-6">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-56 mb-4" />
              <Skeleton className="h-[250px] w-full rounded-md" />
            </div>
            <div className="bg-card border rounded-lg p-6">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-56 mb-4" />
              <Skeleton className="h-[250px] w-full rounded-md" />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Real-Time Notifications</h3>
            </div>
            <div className="mt-3 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card p-3 rounded-md">
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Real-Time Notifications</h3>
            </div>
            <div className="mt-3 space-y-2">
              {notifications.map((notification, index) => (
                <div key={index} className="bg-card p-3 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <p className="text-sm">{notification.message}: <span className="font-medium">{notification.details}</span></p>
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
