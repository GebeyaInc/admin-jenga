import { supabase } from "@/integrations/supabase/client";

export interface DashboardAnalytics {
  // Overview Metrics
  totalTenants: number;
  activeUsers: number;
  totalServices: number;
  systemHealth: string;
  previousTenants: number;
  previousActiveUsers: number;
  previousServices: number;

  // Growth Metrics
  growthData: {
    name: string;
    users: number;
    services: number;
    providers: number;
  }[];
  revenueData: {
    name: string;
    revenue: number;
    projected: number;
  }[];

  // Performance Metrics
  completionRate: number;
  avgCompletionTime: string;
  successRate: number;
  uptime: string;
  avgResponseTime: string;
  errorRate: number;
  peakHours: string;
  usagePatterns: {
    name: string;
    users: number;
  }[];
  activeSessions: number;
  avgSessionDuration: string;

  // Financial Metrics
  revenueDistribution: {
    name: string;
    value: number;
  }[];
  paymentSuccessRate: number;
  totalTransactions: number;
  failedTransactions: number;

  // Health Monitoring
  tenantHealth: {
    id: string;
    name: string;
    status: 'healthy' | 'warning' | 'critical';
    healthScore: number;
  }[];
  systemAlerts: {
    id: string;
    title: string;
    description: string;
    severity: 'warning' | 'critical';
    timestamp: string;
  }[];

  // Usage Analytics
  featureUsage: {
    name: string;
    usage: number;
  }[];
  activeProviders: number;
  providerActivity: {
    name: string;
    active: number;
    new: number;
  }[];
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalytics> {
  console.log("Fetching enhanced dashboard analytics from Supabase");
  
  try {
    // Fetch tenant data
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('*');

    if (tenantsError) {
      console.error("Error fetching tenants:", tenantsError);
      throw tenantsError;
    }

    // Fetch user data
    const { data: users, error: usersError } = await supabase
      .from('marketplace_users')
      .select('*');

    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw usersError;
    }

    // Fetch service data
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*');

    if (servicesError) {
      console.error("Error fetching services:", servicesError);
      throw servicesError;
    }

    // Fetch usage metrics
    const { data: usageMetrics, error: usageError } = await supabase
      .from('usage_metrics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(30);

    if (usageError) {
      console.error("Error fetching usage metrics:", usageError);
      throw usageError;
    }

    // Fetch system metrics
    const { data: systemMetrics, error: systemError } = await supabase
      .from('system_metrics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(30);

    if (systemError) {
      console.error("Error fetching system metrics:", systemError);
      throw systemError;
    }

    // Fetch tenant activities
    const { data: tenantActivities, error: activitiesError } = await supabase
      .from('tenant_activities')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (activitiesError) {
      console.error("Error fetching tenant activities:", activitiesError);
      throw activitiesError;
    }

    // Calculate metrics
    const totalTenants = tenants?.length || 0;
    const activeUsers = users?.filter(u => u.status === 'active').length || 0;
    const totalServices = services?.length || 0;

    // Process growth data
    const growthData = processGrowthData(usageMetrics || [], tenants || []);
    
    // Process revenue data
    const revenueData = processRevenueData(usageMetrics || []);
    
    // Process performance metrics
    const performanceMetrics = processPerformanceMetrics(systemMetrics || []);
    
    // Process financial metrics
    const financialMetrics = processFinancialMetrics(usageMetrics || []);
    
    // Process health monitoring
    const healthMonitoring = processHealthMonitoring(tenants || [], systemMetrics || []);
    
    // Process usage analytics
    const usageAnalytics = processUsageAnalytics(tenantActivities || [], users || []);

    return {
      // Overview Metrics
      totalTenants,
      activeUsers,
      totalServices,
      systemHealth: calculateSystemHealth(systemMetrics || []),
      previousTenants: calculatePreviousCount(tenants || [], 'created_at'),
      previousActiveUsers: calculatePreviousCount(users || [], 'created_at'),
      previousServices: calculatePreviousCount(services || [], 'created_at'),

      // Growth Metrics
      growthData,
      revenueData,

      // Performance Metrics
      ...performanceMetrics,

      // Financial Metrics
      ...financialMetrics,

      // Health Monitoring
      ...healthMonitoring,

      // Usage Analytics
      ...usageAnalytics
    };
  } catch (error) {
    console.error("Error in fetchDashboardAnalytics:", error);
    throw error;
  }
}

// Helper functions for processing data
function processGrowthData(usageMetrics: any[], tenants: any[]) {
  // Group metrics by month
  const monthlyData = usageMetrics.reduce((acc, metric) => {
    const date = new Date(metric.timestamp);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = {
        name: month,
        users: 0,
        services: 0,
        providers: 0
      };
    }
    
    if (metric.metric_type === 'user') {
      acc[month].users += metric.value;
    } else if (metric.metric_type === 'service') {
      acc[month].services += metric.value;
    } else if (metric.metric_type === 'provider') {
      acc[month].providers += metric.value;
    }
    
    return acc;
  }, {});

  return Object.values(monthlyData);
}

function processRevenueData(usageMetrics: any[]) {
  // Group revenue metrics by month
  const monthlyData = usageMetrics.reduce((acc, metric) => {
    if (metric.metric_type === 'revenue') {
      const date = new Date(metric.timestamp);
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = {
          name: month,
          revenue: 0,
          projected: 0
        };
      }
      
      acc[month].revenue += metric.value;
      acc[month].projected = acc[month].revenue * 1.2; // Simple projection
    }
    
    return acc;
  }, {});

  return Object.values(monthlyData);
}

function processPerformanceMetrics(systemMetrics: any[]) {
  const latestMetrics = systemMetrics[0] || {};
  
  return {
    completionRate: latestMetrics.completion_rate || 0,
    avgCompletionTime: latestMetrics.avg_completion_time || '0',
    successRate: latestMetrics.success_rate || 0,
    uptime: latestMetrics.uptime || '100%',
    avgResponseTime: latestMetrics.avg_response_time || '0',
    errorRate: latestMetrics.error_rate || 0,
    peakHours: latestMetrics.peak_hours || '9AM-5PM',
    usagePatterns: processUsagePatterns(systemMetrics),
    activeSessions: latestMetrics.active_sessions || 0,
    avgSessionDuration: latestMetrics.avg_session_duration || '0'
  };
}

function processUsagePatterns(systemMetrics: any[]) {
  // Group metrics by hour
  const hourlyData = systemMetrics.reduce((acc, metric) => {
    if (metric.metric_type === 'usage') {
      const hour = new Date(metric.timestamp).getHours();
      const hourStr = `${hour}:00`;
      
      if (!acc[hourStr]) {
        acc[hourStr] = {
          name: hourStr,
          users: 0
        };
      }
      
      acc[hourStr].users += metric.value;
    }
    
    return acc;
  }, {});

  return Object.values(hourlyData);
}

function processFinancialMetrics(usageMetrics: any[]) {
  const latestMetrics = usageMetrics[0] || {};
  
  return {
    revenueDistribution: processRevenueDistribution(usageMetrics),
    paymentSuccessRate: latestMetrics.payment_success_rate || 0,
    totalTransactions: latestMetrics.total_transactions || 0,
    failedTransactions: latestMetrics.failed_transactions || 0
  };
}

function processRevenueDistribution(usageMetrics: any[]) {
  // Group revenue by tenant
  const tenantRevenue = usageMetrics.reduce((acc, metric) => {
    if (metric.metric_type === 'revenue' && metric.tenant_id) {
      if (!acc[metric.tenant_id]) {
        acc[metric.tenant_id] = {
          name: `Tenant ${metric.tenant_id.substring(0, 8)}`,
          value: 0
        };
      }
      
      acc[metric.tenant_id].value += metric.value;
    }
    
    return acc;
  }, {});

  return Object.values(tenantRevenue);
}

function processHealthMonitoring(tenants: any[], systemMetrics: any[]) {
  const latestMetrics = systemMetrics[0] || {};
  
  return {
    tenantHealth: tenants.map(tenant => ({
      id: tenant.id,
      name: tenant.company_name || `Tenant ${tenant.id.substring(0, 8)}`,
      status: calculateTenantStatus(tenant, latestMetrics),
      healthScore: calculateHealthScore(tenant, latestMetrics)
    })),
    systemAlerts: processSystemAlerts(systemMetrics)
  };
}

function calculateTenantStatus(tenant: any, metrics: any): 'healthy' | 'warning' | 'critical' {
  // Simple status calculation based on metrics
  if (tenant.status === 'active' && metrics.error_rate < 1) {
    return 'healthy';
  } else if (tenant.status === 'active' && metrics.error_rate < 5) {
    return 'warning';
  } else {
    return 'critical';
  }
}

function calculateHealthScore(tenant: any, metrics: any): number {
  // Simple health score calculation
  let score = 100;
  
  if (tenant.status !== 'active') score -= 30;
  if (metrics.error_rate > 0) score -= metrics.error_rate * 10;
  if (metrics.uptime < 99) score -= (100 - metrics.uptime) * 2;
  
  return Math.max(0, Math.min(100, score));
}

function processSystemAlerts(systemMetrics: any[]) {
  return systemMetrics
    .filter(metric => metric.metric_type === 'alert')
    .map(metric => ({
      id: metric.id,
      title: metric.metric_name,
      description: metric.metadata?.description || 'No description available',
      severity: metric.metadata?.severity || 'warning',
      timestamp: new Date(metric.timestamp).toLocaleString()
    }));
}

function processUsageAnalytics(activities: any[], users: any[]) {
  // Group activities by feature
  const featureUsage = activities.reduce((acc, activity) => {
    const feature = activity.activity_type;
    
    if (!acc[feature]) {
      acc[feature] = {
        name: feature,
        usage: 0
      };
    }
    
    acc[feature].usage += 1;
    
    return acc;
  }, {});

  // Calculate usage percentages
  const totalActivities = activities.length;
  Object.values(featureUsage).forEach((feature: any) => {
    feature.usage = Math.round((feature.usage / totalActivities) * 100);
  });

  // Process provider activity
  const providerActivity = processProviderActivity(users);

  return {
    featureUsage: Object.values(featureUsage),
    activeProviders: users.filter(u => u.role === 'provider' && u.status === 'active').length,
    providerActivity
  };
}

function processProviderActivity(users: any[]) {
  // Group providers by month
  const monthlyData = users.reduce((acc, user) => {
    if (user.role === 'provider') {
      const date = new Date(user.created_at);
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = {
          name: month,
          active: 0,
          new: 0
        };
      }
      
      if (user.status === 'active') {
        acc[month].active += 1;
      }
      if (new Date(user.created_at).getMonth() === new Date().getMonth()) {
        acc[month].new += 1;
      }
    }
    
    return acc;
  }, {});

  return Object.values(monthlyData);
}

function calculateSystemHealth(metrics: any[]): string {
  const latestMetrics = metrics[0] || {};
  const uptime = latestMetrics.uptime || 100;
  const errorRate = latestMetrics.error_rate || 0;
  
  // Simple health calculation
  const health = uptime - (errorRate * 2);
  return `${Math.max(0, Math.min(100, health))}%`;
}

function calculatePreviousCount(items: any[], dateField: string): number {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return items.filter(item => {
    const itemDate = new Date(item[dateField]);
    return itemDate < oneMonthAgo;
  }).length;
}
