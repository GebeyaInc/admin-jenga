
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
    
    // Calculate monthly revenue from subscriptions
    const monthlyRevenue = subscriptions?.reduce((sum, sub) => sum + (parseFloat(sub.price?.toString() || "0") || 0), 0) || 0;
    
    // Calculate churn rate (placeholder - would need more data)
    const churnRate = 2.4; // Placeholder value, ideally calculated from historical data
    
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
    subscriptions?.forEach(sub => {
      const plan = sub.plan || 'Unknown';
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });
    
    const subscriptionData = Object.entries(planCounts).map(([name, value]) => ({
      name,
      value
    }));

    // Sample marketplace data (as this might not be directly available in the analytics)
    const marketplaceData = [
      { name: 'Health & Wellness', value: 30 },
      { name: 'Technology', value: 25 },
      { name: 'Education', value: 20 },
      { name: 'Professional Services', value: 15 },
      { name: 'E-commerce', value: 10 },
    ];

    // Sample notifications (these would typically come from a dedicated notifications table)
    const notifications = [
      {
        type: "success" as const,
        message: "New tenant signup",
        details: "TechCorp Inc.",
        time: "2 mins ago"
      },
      {
        type: "warning" as const,
        message: "Subscription payment pending",
        details: "Health Plus LLC",
        time: "15 mins ago"
      },
      {
        type: "error" as const,
        message: "Failed payment for",
        details: "Global Services Co.",
        time: "47 mins ago"
      }
    ];

    return {
      totalTenants,
      totalMarketplaces: tenants?.filter(t => t.template_id !== null).length || 0,
      monthlyRevenue,
      churnRate,
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
