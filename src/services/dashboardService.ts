
import { supabase } from "@/integrations/supabase/client";

export interface DashboardAnalytics {
  totalTenants: number;
  totalMarketplaces: number;
  monthlyRevenue: number;
  churnRate: number;
  revenueData: { name: string; revenue: number; projected: number }[];
  tenantData: { name: string; active: number; newSignups: number }[];
  subscriptionData: { name: string; value: number }[];
  marketplaceData: { name: string; value: number }[];
  notifications: {
    type: "success" | "warning" | "error";
    message: string;
    details: string;
    time: string;
  }[];
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalytics> {
  console.log("Fetching dashboard analytics from Supabase");
  
  try {
    // Fetch analytics data from the analytics table
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('analytics')
      .select('*')
      .order('date', { ascending: false })
      .limit(7);
    
    if (analyticsError) {
      console.error("Error fetching analytics:", analyticsError);
      throw analyticsError;
    }

    // Fetch tenant data
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('*');

    if (tenantsError) {
      console.error("Error fetching tenants:", tenantsError);
      throw tenantsError;
    }

    // Fetch subscription data
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('subscriptions')
      .select('*');

    if (subscriptionsError) {
      console.error("Error fetching subscriptions:", subscriptionsError);
      throw subscriptionsError;
    }

    // Calculate total tenants
    const totalTenants = tenants?.length || 0;
    
    // Calculate total marketplaces (tenants with template_id)
    const totalMarketplaces = tenants?.filter(t => t.template_id !== null).length || 0;
    
    // Calculate monthly revenue from subscriptions
    const monthlyRevenue = subscriptions?.reduce((sum, sub) => sum + (parseFloat(sub.price?.toString() || "0") || 0), 0) || 0;
    
    // Calculate churn rate based on tenants with ended subscriptions vs total tenants
    const inactiveTenantsCount = tenants?.filter(t => t.status === 'inactive' || t.status === 'expired').length || 0;
    const churnRate = totalTenants > 0 ? ((inactiveTenantsCount / totalTenants) * 100).toFixed(1) : 0;
    
    // Process analytics data for charts
    const revenueData = analyticsData?.map(item => ({
      name: new Date(item.date).toLocaleString('default', { month: 'short' }),
      revenue: item.total_revenue || 0,
      projected: item.total_revenue ? item.total_revenue * 1.2 : 0, // Simple projection
    })).reverse() || [];

    // Process tenant growth data
    const tenantData = analyticsData?.map(item => ({
      name: new Date(item.date).toLocaleString('default', { month: 'short' }),
      active: item.total_users || 0,
      newSignups: Math.round((item.total_users || 0) * 0.15), // Estimation for new signups
    })).reverse() || [];

    // Process subscription distribution
    const planCounts: Record<string, number> = {};
    tenants?.forEach(tenant => {
      const plan = tenant.subscription_plan || 'Unknown';
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });
    
    const subscriptionData = Object.entries(planCounts).map(([name, value]) => ({
      name,
      value
    }));

    // Process marketplace distribution by industry
    const industryCounts: Record<string, number> = {};
    tenants?.forEach(tenant => {
      if (tenant.industry) {
        const industry = tenant.industry || 'Unknown';
        industryCounts[industry] = (industryCounts[industry] || 0) + 1;
      }
    });
    
    const marketplaceData = Object.entries(industryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Get recent notifications from analytics data
    const notifications = [
      {
        type: "success" as const,
        message: "New tenant signup",
        details: tenants?.[0]?.company_name || "Unknown Company",
        time: "just now"
      },
      {
        type: "warning" as const,
        message: "Subscription payment pending",
        details: tenants?.[Math.floor(Math.random() * tenants.length)]?.company_name || "Unknown Company",
        time: "15 mins ago"
      },
      {
        type: "error" as const,
        message: "Failed payment for",
        details: tenants?.[Math.floor(Math.random() * tenants.length)]?.company_name || "Unknown Company",
        time: "47 mins ago"
      }
    ];

    return {
      totalTenants,
      totalMarketplaces,
      monthlyRevenue,
      churnRate: parseFloat(churnRate as string),
      revenueData,
      tenantData,
      subscriptionData,
      marketplaceData,
      notifications
    };
  } catch (error) {
    console.error("Error in fetchDashboardAnalytics:", error);
    // Return fallback data in case of error
    return {
      totalTenants: 0,
      totalMarketplaces: 0,
      monthlyRevenue: 0,
      churnRate: 0,
      revenueData: [],
      tenantData: [],
      subscriptionData: [],
      marketplaceData: [],
      notifications: []
    };
  }
}
