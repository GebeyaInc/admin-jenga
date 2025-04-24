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
  XCircle,
  Clock,
  BarChart2,
  LineChart,
  PieChart,
  AlertCircle,
  Server,
  Zap,
  Calendar,
  Clock4
} from 'lucide-react';
import { MetricCard } from '../dashboard/MetricCard';
import { Chart } from '../dashboard/Chart';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardAnalytics } from '@/services/dashboardService';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const EnhancedAnalytics: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboardAnalytics'],
    queryFn: fetchDashboardAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (error) {
    console.error("Error fetching dashboard data:", error);
  }

  // Calculate trends
  const getTrend = (current: number, previous: number | undefined) => {
    if (previous === undefined || previous === 0) return { value: 0, positive: true };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change * 10) / 10),
      positive: change >= 0
    };
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Comprehensive platform performance metrics</p>
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
              <DropdownMenuLabel>Time Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>This Quarter</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
              <DropdownMenuItem>Custom Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-9">Export Report</Button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <MetricCard 
              key={i}
              title={<Skeleton className="h-4 w-24" />}
              value={<Skeleton className="h-8 w-16" />}
              description={<Skeleton className="h-3 w-32" />}
            />
          ))
        ) : (
          <>
            <MetricCard 
              title="Total Tenants" 
              value={dashboardData?.totalTenants.toString() || "0"} 
              description="Active and trial accounts" 
              icon={<Building className="h-4 w-4" />}
              trend={getTrend(dashboardData?.totalTenants || 0, dashboardData?.previousTenants || 0)}
            />
            <MetricCard 
              title="Active Users" 
              value={dashboardData?.activeUsers.toString() || "0"} 
              description="Last 30 days" 
              icon={<Users className="h-4 w-4" />}
              trend={getTrend(dashboardData?.activeUsers || 0, dashboardData?.previousActiveUsers || 0)}
            />
            <MetricCard 
              title="Total Services" 
              value={dashboardData?.totalServices.toString() || "0"} 
              description="Across all marketplaces" 
              icon={<ShoppingBag className="h-4 w-4" />}
              trend={getTrend(dashboardData?.totalServices || 0, dashboardData?.previousServices || 0)}
            />
            <MetricCard 
              title="System Health" 
              value={dashboardData?.systemHealth || "100%"} 
              description="Uptime and performance" 
              icon={<Server className="h-4 w-4" />}
              trend={{ value: 0, positive: true }}
            />
          </>
        )}
      </div>

      {/* Growth Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Platform growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <Chart 
                title="Growth Metrics" 
                description="User and service growth trends"
                data={dashboardData?.growthData || []}
                type="line"
                yKeys={['users', 'services', 'providers']}
                height={300}
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <Chart 
                title="Revenue Trends" 
                description="Monthly revenue and projections"
                data={dashboardData?.revenueData || []}
                type="area"
                yKeys={['revenue', 'projected']}
                height={300}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Completion</CardTitle>
            <CardDescription>Success rates and performance</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="text-sm font-medium">{dashboardData?.completionRate || 0}%</span>
                </div>
                <Progress value={dashboardData?.completionRate || 0} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Average Time</div>
                    <div className="text-lg font-semibold">{dashboardData?.avgCompletionTime || '0'} days</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-lg font-semibold">{dashboardData?.successRate || 0}%</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Uptime and health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">System Uptime</span>
                  <span className="text-sm font-medium">{dashboardData?.uptime || '100%'}</span>
                </div>
                <Progress value={parseFloat(dashboardData?.uptime || '100')} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                    <div className="text-lg font-semibold">{dashboardData?.avgResponseTime || '0'}ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                    <div className="text-lg font-semibold">{dashboardData?.errorRate || 0}%</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usage Patterns</CardTitle>
            <CardDescription>Peak times and activity</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Peak Hours</span>
                  <span className="text-sm font-medium">{dashboardData?.peakHours || '9AM-5PM'}</span>
                </div>
                <div className="h-[100px]">
                  <Chart 
                    data={dashboardData?.usagePatterns || []}
                    type="bar"
                    yKeys={['users']}
                    height={100}
                    hideLegend
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Active Sessions</div>
                    <div className="text-lg font-semibold">{dashboardData?.activeSessions || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg. Duration</div>
                    <div className="text-lg font-semibold">{dashboardData?.avgSessionDuration || '0'} min</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Financial Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>By tenant and service type</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <Chart 
                data={dashboardData?.revenueDistribution || []}
                type="pie"
                yKeys={['value']}
                height={300}
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Success</CardTitle>
            <CardDescription>Transaction success rates</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="text-sm font-medium">{dashboardData?.paymentSuccessRate || 0}%</span>
                </div>
                <Progress value={dashboardData?.paymentSuccessRate || 0} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Transactions</div>
                    <div className="text-lg font-semibold">{dashboardData?.totalTransactions || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Failed Transactions</div>
                    <div className="text-lg font-semibold">{dashboardData?.failedTransactions || 0}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Health Monitoring Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tenant Health</CardTitle>
            <CardDescription>Performance and status indicators</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="space-y-4">
                {dashboardData?.tenantHealth?.map((tenant: any) => (
                  <div key={tenant.id} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        tenant.status === 'healthy' ? 'bg-green-500' : 
                        tenant.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span>{tenant.name}</span>
                    </div>
                    <Badge variant={tenant.status === 'healthy' ? 'default' : 'destructive'}>
                      {tenant.healthScore}%
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Recent warnings and issues</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="space-y-4">
                {dashboardData?.systemAlerts?.map((alert: any) => (
                  <div key={alert.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted">
                    <AlertCircle className={`h-4 w-4 mt-1 ${
                      alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
            <CardDescription>Most used platform features</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="space-y-4">
                {dashboardData?.featureUsage?.map((feature: any) => (
                  <div key={feature.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{feature.name}</span>
                      <span className="text-sm font-medium">{feature.usage}%</span>
                    </div>
                    <Progress value={feature.usage} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Provider Activity</CardTitle>
            <CardDescription>Service provider engagement</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Providers</span>
                  <span className="text-sm font-medium">{dashboardData?.activeProviders || 0}</span>
                </div>
                <div className="h-[200px]">
                  <Chart 
                    data={dashboardData?.providerActivity || []}
                    type="bar"
                    yKeys={['active', 'new']}
                    height={200}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 