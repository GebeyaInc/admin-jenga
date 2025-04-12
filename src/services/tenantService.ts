
import { supabase } from "@/integrations/supabase/client";
import { formatIndustryName, formatDate, formatPlanDisplay } from "@/utils/formatters";

// Re-export the analytics functionality with explicit "export type" for the TenantAnalytics interface
export { fetchTenantAnalytics } from "./analyticsService";
export type { TenantAnalytics } from "./analyticsService";

export interface Tenant {
  id: string;
  name: string;
  industry: string;
  location: string;
  status: string;
  plan: string;
  users: number;
  providers: number;
  marketplaces: number;
  activeSince: string;
  createdAt: Date;
}

/**
 * Generates a consistent number of providers based on tenant ID
 * This ensures consistent numbers for the same tenant
 */
function generateProviderCount(tenantId: string): number {
  const providerId = parseInt(tenantId.replace(/\D/g, '').substring(0, 5), 10);
  return (providerId % 30) + 5; // Range: 5-34 providers
}

/**
 * Maps raw Supabase tenant data to the Tenant interface
 */
function mapTenantData(tenant: any): Tenant {
  // Format the date to a readable string
  const createdAt = new Date(tenant.created_at);
  const formattedDate = formatDate(createdAt);
  
  // Format plan price based on subscription_plan
  const planDisplay = formatPlanDisplay(tenant.subscription_plan);
  
  // Generate consistent provider numbers
  const providers = generateProviderCount(tenant.id);
  
  // Get a proper name for the tenant, handling empty or "EMPTY" values
  const companyName = tenant.company_name && tenant.company_name !== "EMPTY" 
    ? tenant.company_name 
    : `Unnamed Tenant (${tenant.subdomain || tenant.id.substring(0, 6)})`;
  
  return {
    id: tenant.id,
    name: companyName,
    industry: formatIndustryName(tenant.industry || 'unknown'),
    location: tenant.location || 'Unknown',
    status: tenant.status || 'Active',
    plan: planDisplay,
    users: Math.floor(Math.random() * 200) + 50, // Placeholder for now
    providers: providers,
    marketplaces: tenant.template_id ? 1 : 0,
    activeSince: formattedDate,
    createdAt: createdAt
  };
}

/**
 * Fetches all tenants from Supabase
 */
export async function fetchTenants(): Promise<Tenant[]> {
  console.log("Fetching tenants from Supabase");
  
  try {
    const { data: tenants, error } = await supabase
      .from('tenants')
      .select(`
        id,
        company_name,
        industry,
        location,
        status,
        subscription_plan,
        created_at,
        template_id,
        subdomain
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching tenants:", error);
      throw error;
    }
    
    // Format the tenant data
    return tenants.map(mapTenantData);
  } catch (error) {
    console.error("Error in fetchTenants:", error);
    return [];
  }
}
