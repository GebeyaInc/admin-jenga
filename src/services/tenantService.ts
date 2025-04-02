
import { supabase } from "@/integrations/supabase/client";

export interface TenantAnalytics {
  totalTenants: number;
  activeMarketplaces: number;
  topIndustry: {
    name: string;
    percentage: number;
  };
  topLocation: {
    name: string;
    percentage: number;
  };
}

export async function fetchTenantAnalytics(): Promise<TenantAnalytics> {
  console.log("Fetching tenant analytics from Supabase");
  
  try {
    // Fetch tenant data
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('*');

    if (tenantsError) {
      console.error("Error fetching tenants:", tenantsError);
      throw tenantsError;
    }

    // Calculate total tenants
    const totalTenants = tenants?.length || 0;
    
    // Calculate active marketplaces (tenants with template_id set)
    const activeMarketplaces = tenants?.filter(t => t.template_id !== null).length || 0;
    
    // Calculate industry distribution
    const industryCount: Record<string, number> = {};
    tenants?.forEach(tenant => {
      if (tenant.industry) {
        industryCount[tenant.industry] = (industryCount[tenant.industry] || 0) + 1;
      }
    });
    
    // Get top industry
    let topIndustry = { name: "N/A", count: 0, percentage: 0 };
    Object.entries(industryCount).forEach(([industry, count]) => {
      if (count > topIndustry.count) {
        topIndustry = { 
          name: formatIndustryName(industry), 
          count, 
          percentage: Math.round((count / totalTenants) * 100) 
        };
      }
    });
    
    // Calculate location distribution
    const locationCount: Record<string, number> = {};
    tenants?.forEach(tenant => {
      if (tenant.location) {
        locationCount[tenant.location] = (locationCount[tenant.location] || 0) + 1;
      }
    });
    
    // Get top location
    let topLocation = { name: "N/A", count: 0, percentage: 0 };
    Object.entries(locationCount).forEach(([location, count]) => {
      if (count > topLocation.count) {
        topLocation = { 
          name: location, 
          count, 
          percentage: Math.round((count / totalTenants) * 100) 
        };
      }
    });

    return {
      totalTenants,
      activeMarketplaces,
      topIndustry: {
        name: topIndustry.name,
        percentage: topIndustry.percentage
      },
      topLocation: {
        name: topLocation.name,
        percentage: topLocation.percentage
      }
    };
  } catch (error) {
    console.error("Error in fetchTenantAnalytics:", error);
    // Return fallback data in case of error
    return {
      totalTenants: 0,
      activeMarketplaces: 0,
      topIndustry: {
        name: "N/A",
        percentage: 0
      },
      topLocation: {
        name: "N/A",
        percentage: 0
      }
    };
  }
}

// Helper function to format industry names
function formatIndustryName(industry: string): string {
  // Convert kebab-case to Title Case
  return industry
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
