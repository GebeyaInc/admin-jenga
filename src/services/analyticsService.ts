
import { supabase } from "@/integrations/supabase/client";
import { formatIndustryName } from "@/utils/formatters";

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
  industryDistribution: {
    name: string;
    value: number;
  }[];
  locationDistribution: {
    name: string;
    value: number;
  }[];
}

/**
 * Calculates industry distribution from tenant data
 */
function calculateIndustryDistribution(tenants: any[]) {
  const industryCount: Record<string, number> = {};
  tenants.forEach(tenant => {
    if (tenant.industry) {
      industryCount[tenant.industry] = (industryCount[tenant.industry] || 0) + 1;
    }
  });
  
  return Object.entries(industryCount).map(([industry, count]) => ({
    name: formatIndustryName(industry),
    value: count
  })).sort((a, b) => b.value - a.value);
}

/**
 * Gets the top industry from tenant data
 */
function getTopIndustry(industryCount: Record<string, number>, totalTenants: number) {
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
  
  return {
    name: topIndustry.name,
    percentage: topIndustry.percentage
  };
}

/**
 * Calculates location distribution from tenant data
 */
function calculateLocationDistribution(tenants: any[]) {
  const locationCount: Record<string, number> = {};
  tenants.forEach(tenant => {
    if (tenant.location) {
      locationCount[tenant.location] = (locationCount[tenant.location] || 0) + 1;
    }
  });
  
  return Object.entries(locationCount).map(([location, count]) => ({
    name: location,
    value: count
  })).sort((a, b) => b.value - a.value);
}

/**
 * Gets the top location from location count data
 */
function getTopLocation(locationCount: Record<string, number>, totalTenants: number) {
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
    name: topLocation.name,
    percentage: topLocation.percentage
  };
}

/**
 * Fetches and calculates analytics data for tenants
 */
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
    
    // Create industry distribution array for chart
    const industryDistribution = calculateIndustryDistribution(tenants || []);
    
    // Get top industry
    const topIndustry = getTopIndustry(industryCount, totalTenants);
    
    // Calculate location distribution
    const locationCount: Record<string, number> = {};
    tenants?.forEach(tenant => {
      if (tenant.location) {
        locationCount[tenant.location] = (locationCount[tenant.location] || 0) + 1;
      }
    });
    
    // Create location distribution array for chart
    const locationDistribution = calculateLocationDistribution(tenants || []);
    
    // Get top location
    const topLocation = getTopLocation(locationCount, totalTenants);

    return {
      totalTenants,
      activeMarketplaces,
      topIndustry,
      topLocation,
      industryDistribution: industryDistribution.slice(0, 5), // Return top 5 industries
      locationDistribution: locationDistribution.slice(0, 5)  // Return top 5 locations
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
      },
      industryDistribution: [],
      locationDistribution: []
    };
  }
}
